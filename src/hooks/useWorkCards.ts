import { useState, useEffect } from "react";
import { StoredWorkCard } from "@/types/workCard";
import { useToast } from "@/components/ui/use-toast";

export const useWorkCards = (userRole: string) => {
  const [storedWorkCards, setStoredWorkCards] = useState<StoredWorkCard[]>(() => {
    const plannerCards = localStorage.getItem("workCards_maintenance-planner");
    const technicianCards = localStorage.getItem("workCards_engineer-technician");
    
    const plannerData = plannerCards ? JSON.parse(plannerCards) : [];
    const technicianData = technicianCards ? JSON.parse(technicianCards) : [];
    
    if (userRole === "engineer-technician") {
      return [...plannerData, ...technicianData];
    }
    
    const saved = localStorage.getItem(`workCards_${userRole}`);
    return saved ? JSON.parse(saved) : [];
  });
  
  const { toast } = useToast();

  // Effect to periodically refresh the work cards from localStorage
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      const plannerCards = localStorage.getItem("workCards_maintenance-planner");
      const technicianCards = localStorage.getItem("workCards_engineer-technician");
      
      const plannerData = plannerCards ? JSON.parse(plannerCards) : [];
      const technicianData = technicianCards ? JSON.parse(technicianCards) : [];
      
      if (userRole === "engineer-technician") {
        setStoredWorkCards([...plannerData, ...technicianData]);
      } else {
        const saved = localStorage.getItem(`workCards_${userRole}`);
        if (saved) {
          setStoredWorkCards(JSON.parse(saved));
        }
      }
    }, 1000); // Refresh every second

    return () => clearInterval(refreshInterval);
  }, [userRole]);

  const addWorkCard = (newWorkCard: StoredWorkCard) => {
    const updatedWorkCards = [newWorkCard, ...storedWorkCards];
    setStoredWorkCards(updatedWorkCards);
    localStorage.setItem(`workCards_${userRole}`, JSON.stringify(updatedWorkCards));
    
    toast({
      title: "Work Card Generated",
      description: "The work card has been generated and stored successfully.",
    });
  };

  const deleteWorkCard = (id: string) => {
    const updatedWorkCards = storedWorkCards.filter((card) => card.id !== id);
    setStoredWorkCards(updatedWorkCards);
    localStorage.setItem(`workCards_${userRole}`, JSON.stringify(updatedWorkCards));
    
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
        const updatedCard = {
          ...card,
          status: 'scheduled' as const,
          scheduledDate,
          scheduledLocation,
          assignedTechnician,
          requiredParts
        } satisfies StoredWorkCard;
        return updatedCard;
      }
      return card;
    });
    
    // Update both planner and technician storage
    setStoredWorkCards(updatedWorkCards);
    localStorage.setItem(`workCards_${userRole}`, JSON.stringify(updatedWorkCards));
    
    // If current user is planner, also update technician's storage
    if (userRole === 'maintenance-planner') {
      const technicianCards = localStorage.getItem("workCards_engineer-technician");
      const technicianData = technicianCards ? JSON.parse(technicianCards) : [];
      const updatedTechnicianCards = [...technicianData];
      
      // Find if the card already exists in technician's storage
      const cardIndex = updatedTechnicianCards.findIndex(card => card.id === cardId);
      if (cardIndex >= 0) {
        updatedTechnicianCards[cardIndex] = updatedWorkCards.find(card => card.id === cardId)!;
      } else {
        updatedTechnicianCards.push(updatedWorkCards.find(card => card.id === cardId)!);
      }
      
      localStorage.setItem("workCards_engineer-technician", JSON.stringify(updatedTechnicianCards));
    }
    
    // Force a refresh by triggering another state update after a short delay
    setTimeout(() => {
      setStoredWorkCards([...updatedWorkCards]);
    }, 100);
    
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
