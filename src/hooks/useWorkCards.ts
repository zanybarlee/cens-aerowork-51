import { useState, useEffect } from "react";
import { StoredWorkCard } from "@/types/workCard";
import { useToast } from "@/components/ui/use-toast";

export const useWorkCards = (userRole: string) => {
  const [storedWorkCards, setStoredWorkCards] = useState<StoredWorkCard[]>(() => {
    if (userRole === "engineer-technician") {
      const plannerCards = localStorage.getItem("workCards_maintenance-planner") || "[]";
      const technicianCards = localStorage.getItem("workCards_engineer-technician") || "[]";
      
      const plannerData = JSON.parse(plannerCards);
      const technicianData = JSON.parse(technicianCards);
      
      // Combine cards and remove duplicates based on ID
      const allCards = [...plannerData, ...technicianData];
      const uniqueCards = allCards.reduce((acc: StoredWorkCard[], current) => {
        const exists = acc.find(card => card.id === current.id);
        if (!exists) {
          acc.push(current);
        } else if (exists.status !== current.status) {
          // If statuses differ, keep the most recent version
          const existingIndex = acc.findIndex(card => card.id === current.id);
          acc[existingIndex] = current;
        }
        return acc;
      }, []);
      
      return uniqueCards;
    }
    
    const saved = localStorage.getItem(`workCards_${userRole}`);
    return saved ? JSON.parse(saved) : [];
  });
  
  const { toast } = useToast();

  useEffect(() => {
    const refreshData = () => {
      if (userRole === "engineer-technician") {
        const plannerCards = localStorage.getItem("workCards_maintenance-planner") || "[]";
        const technicianCards = localStorage.getItem("workCards_engineer-technician") || "[]";
        
        const plannerData = JSON.parse(plannerCards);
        const technicianData = JSON.parse(technicianCards);
        
        // Combine cards and remove duplicates based on ID
        const allCards = [...plannerData, ...technicianData];
        const uniqueCards = allCards.reduce((acc: StoredWorkCard[], current) => {
          const exists = acc.find(card => card.id === current.id);
          if (!exists) {
            acc.push(current);
          } else if (exists.status !== current.status) {
            // If statuses differ, keep the most recent version
            const existingIndex = acc.findIndex(card => card.id === current.id);
            acc[existingIndex] = current;
          }
          return acc;
        }, []);
        
        setStoredWorkCards(uniqueCards);
      } else {
        const saved = localStorage.getItem(`workCards_${userRole}`);
        if (saved) {
          setStoredWorkCards(JSON.parse(saved));
        }
      }
    };

    refreshData();
    const refreshInterval = setInterval(refreshData, 1000);
    return () => clearInterval(refreshInterval);
  }, [userRole]);

  const addWorkCard = (newWorkCard: StoredWorkCard) => {
    if (userRole === "engineer-technician") {
      // For technicians, update both storages when completing a card
      if (newWorkCard.status === 'completed') {
        const plannerCards = localStorage.getItem("workCards_maintenance-planner") || "[]";
        const plannerData = JSON.parse(plannerCards);
        const updatedPlannerCards = plannerData.map((card: StoredWorkCard) =>
          card.id === newWorkCard.id ? newWorkCard : card
        );
        localStorage.setItem("workCards_maintenance-planner", JSON.stringify(updatedPlannerCards));
        
        const technicianCards = localStorage.getItem("workCards_engineer-technician") || "[]";
        const technicianData = JSON.parse(technicianCards);
        const updatedTechnicianCards = technicianData.map((card: StoredWorkCard) =>
          card.id === newWorkCard.id ? newWorkCard : card
        );
        if (!updatedTechnicianCards.find(card => card.id === newWorkCard.id)) {
          updatedTechnicianCards.push(newWorkCard);
        }
        localStorage.setItem("workCards_engineer-technician", JSON.stringify(updatedTechnicianCards));
      }
    } else {
      // For planners, update their storage normally
      const updatedWorkCards = storedWorkCards.map(card => 
        card.id === newWorkCard.id ? newWorkCard : card
      );

      if (!updatedWorkCards.find(card => card.id === newWorkCard.id)) {
        updatedWorkCards.unshift(newWorkCard);
      }

      setStoredWorkCards(updatedWorkCards);
      localStorage.setItem(`workCards_${userRole}`, JSON.stringify(updatedWorkCards));
    }
  };

  const deleteWorkCard = (id: string) => {
    const updatedWorkCards = storedWorkCards.filter((card) => card.id !== id);
    setStoredWorkCards(updatedWorkCards);
    localStorage.setItem(`workCards_${userRole}`, JSON.stringify(updatedWorkCards));
    
    // If technician deletes a card, also remove from planner's storage
    if (userRole === "engineer-technician") {
      const plannerCards = localStorage.getItem("workCards_maintenance-planner") || "[]";
      const plannerData = JSON.parse(plannerCards);
      const updatedPlannerCards = plannerData.filter((card: StoredWorkCard) => card.id !== id);
      localStorage.setItem("workCards_maintenance-planner", JSON.stringify(updatedPlannerCards));
    }
    
    toast({
      title: "Work Card Deleted",
      description: "The work card has been deleted successfully.",
    });
  };

  const scheduleWorkCard = (
    cardId: string, 
    scheduledDate: string, 
    scheduledLocation: string, 
    assignedTechnician: string, 
    requiredParts: { partNumber: string; quantity: number }[]
  ) => {
    const updatedWorkCards = storedWorkCards.map(card => {
      if (card.id === cardId) {
        return {
          ...card,
          status: 'scheduled' as const,
          scheduledDate,
          scheduledLocation,
          assignedTechnician,
          requiredParts
        };
      }
      return card;
    });
    
    setStoredWorkCards(updatedWorkCards);
    localStorage.setItem(`workCards_${userRole}`, JSON.stringify(updatedWorkCards));
    
    // When a planner schedules a card, add it to technician's storage
    if (userRole === 'maintenance-planner') {
      const technicianCards = localStorage.getItem("workCards_engineer-technician") || "[]";
      const technicianData = JSON.parse(technicianCards);
      const updatedTechnicianCards = [...technicianData];
      
      const scheduledCard = updatedWorkCards.find(card => card.id === cardId);
      if (scheduledCard) {
        const existingIndex = updatedTechnicianCards.findIndex(card => card.id === cardId);
        if (existingIndex >= 0) {
          updatedTechnicianCards[existingIndex] = scheduledCard;
        } else {
          updatedTechnicianCards.push(scheduledCard);
        }
        localStorage.setItem("workCards_engineer-technician", JSON.stringify(updatedTechnicianCards));
      }
    }
    
    const isUpdate = storedWorkCards.find(card => card.id === cardId)?.status === 'scheduled';
    
    toast({
      title: isUpdate ? "Work Card Updated" : "Work Card Scheduled",
      description: isUpdate 
        ? "The work card schedule has been updated successfully."
        : "The work card has been scheduled successfully.",
    });
  };

  return {
    storedWorkCards,
    addWorkCard,
    deleteWorkCard,
    scheduleWorkCard
  };
};
