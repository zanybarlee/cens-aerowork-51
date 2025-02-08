import { useState } from "react";
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

  return {
    storedWorkCards,
    addWorkCard,
    deleteWorkCard
  };
};
