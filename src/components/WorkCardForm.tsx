
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, Info } from "lucide-react";
import ReactMarkdown from "react-markdown";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StoredWorkCard {
  id: string;
  content: string;
  flightHours: string;
  cycles: string;
  environment: string;
  date: string;
  role: string;
}

interface WorkCardFormProps {
  userRole: string;
}

export function WorkCardForm({ userRole }: WorkCardFormProps) {
  const [flightHours, setFlightHours] = useState("100");
  const [cycles, setCycles] = useState("");
  const [environment, setEnvironment] = useState("");
  const [workCard, setWorkCard] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [storedWorkCards, setStoredWorkCards] = useState<StoredWorkCard[]>(() => {
    const saved = localStorage.getItem(`workCards_${userRole}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();

  const handleFlightHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      setFlightHours(value);
    }
  };

  const handleCyclesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      setCycles(value);
    }
  };

  const generatePrompt = (flightHours: string, cycles: string, environment: string) => {
    return `For aircraft with ${flightHours} flight hours, ${cycles} cycles, operating in ${environment} environment, considering Every third 100 hour inspection (300 hours) or every 12 months & DMC-412-A-96-00-00-00A-00SA-A, can you provide all the related inspection description, tasks and parts and generate the work card?`;
  };

  async function query(data: { question: string }) {
    const response = await fetch(
      "http://127.0.0.1:3000/api/v1/prediction/7f8cd391-aa9d-417e-bf62-9f468fda4422",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result.text;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setWorkCard("");

    try {
      const prompt = generatePrompt(flightHours, cycles, environment);
      const response = await query({ question: prompt });
      setWorkCard(response);
      setIsDetailsOpen(true);

      const newWorkCard: StoredWorkCard = {
        id: Date.now().toString(),
        content: response,
        flightHours,
        cycles,
        environment,
        date: new Date().toLocaleDateString(),
        role: userRole
      };
      
      const updatedWorkCards = [newWorkCard, ...storedWorkCards];
      setStoredWorkCards(updatedWorkCards);
      localStorage.setItem(`workCards_${userRole}`, JSON.stringify(updatedWorkCards));

      toast({
        title: "Work Card Generated",
        description: "The work card has been generated and stored successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate work card. Please try again.",
        variant: "destructive",
      });
      console.error("Error generating work card:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    const updatedWorkCards = storedWorkCards.filter((card) => card.id !== id);
    setStoredWorkCards(updatedWorkCards);
    localStorage.setItem(`workCards_${userRole}`, JSON.stringify(updatedWorkCards));
    
    toast({
      title: "Work Card Deleted",
      description: "The work card has been deleted successfully.",
    });
  };

  const handleViewDetails = (content: string) => {
    setWorkCard(content);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card className="w-full transition-all duration-300 hover:shadow-lg animate-fadeIn">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-workspace-text">
            Work Card Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="flightHours">Flight Hours</Label>
              <div className="relative flex gap-2">
                <Input
                  id="flightHours"
                  type="text"
                  placeholder="Enter flight hours"
                  value={flightHours}
                  onChange={handleFlightHoursChange}
                  className="flex-1"
                  required
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" type="button">
                      Presets
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setFlightHours("100")}>
                      100 Hours
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFlightHours("300")}>
                      300 Hours
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFlightHours("600")}>
                      600 Hours
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cycles">Cycles</Label>
              <div className="relative flex gap-2">
                <Input
                  id="cycles"
                  type="text"
                  placeholder="Enter total cycles"
                  value={cycles}
                  onChange={handleCyclesChange}
                  className="flex-1"
                  required
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" type="button">
                      Presets
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setCycles("10")}>
                      10 Cycles
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCycles("20")}>
                      20 Cycles
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCycles("50")}>
                      50 Cycles
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="environment">Operating Environment</Label>
              <Input
                id="environment"
                placeholder="e.g., Coastal, Desert, Arctic"
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit"
              className="w-full bg-workspace-primary hover:bg-workspace-primary/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Work Card"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Work Card Details</DialogTitle>
          </DialogHeader>
          <div className="prose prose-sm max-w-none dark:prose-invert bg-muted p-4 rounded-lg">
            <ReactMarkdown>{workCard}</ReactMarkdown>
          </div>
        </DialogContent>
      </Dialog>

      {storedWorkCards.length > 0 && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-workspace-text">
              Stored Work Cards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Environment</TableHead>
                    <TableHead>Flight Hours</TableHead>
                    <TableHead>Cycles</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {storedWorkCards.map((card) => (
                    <TableRow key={card.id}>
                      <TableCell>{card.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{card.environment}</Badge>
                      </TableCell>
                      <TableCell>{card.flightHours}</TableCell>
                      <TableCell>{card.cycles}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(card.content)}
                        >
                          <Info className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(card.id)}
                          className="text-destructive hover:text-destructive/90"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
