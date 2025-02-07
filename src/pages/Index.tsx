import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Rocket, Database, ChartLine, Cog, UserCheck, Plane, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-workspace-background to-workspace-secondary/10">
      {/* Hero Section */}
      <section className="container mx-auto py-16 px-4">
        <div className="text-center space-y-6 animate-fadeIn">
          <h1 className="text-5xl font-bold text-workspace-primary">
            AI AeroGuardian
          </h1>
          <p className="text-2xl text-workspace-text/80 max-w-3xl mx-auto">
            Next-generation AI-powered platform for aerospace maintenance, repair, and overhaul operations
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button 
              className="bg-workspace-primary hover:bg-workspace-primary/90 text-white px-8 py-6 text-lg"
              onClick={() => navigate("/login")}
            >
              Get Started
            </Button>
            <Button variant="outline" className="border-workspace-primary text-workspace-primary px-8 py-6 text-lg">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-workspace-primary text-center mb-12">
          Intelligent MRO Solutions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Rocket className="w-10 h-10 text-workspace-primary" />}
            title="Autonomous MRO Agents"
            description="AI-driven agents that optimize routing, scheduling, and resource allocation"
          />
          <FeatureCard
            icon={<Database className="w-10 h-10 text-workspace-primary" />}
            title="Predictive Analytics"
            description="Data-driven forecasts for proactive inventory management"
          />
          <FeatureCard
            icon={<ChartLine className="w-10 h-10 text-workspace-primary" />}
            title="Digital Work Cards"
            description="End-to-end automated work card processes for compliance"
          />
          <FeatureCard
            icon={<Shield className="w-10 h-10 text-workspace-primary" />}
            title="Risk Management"
            description="Proactive risk identification and business continuity"
          />
          <FeatureCard
            icon={<Cog className="w-10 h-10 text-workspace-primary" />}
            title="Real-Time Optimization"
            description="Live monitoring and dynamic resource adjustment"
          />
          <FeatureCard
            icon={<Plane className="w-10 h-10 text-workspace-primary" />}
            title="Quality Control"
            description="AI-powered defect detection and quality assurance"
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto py-16 px-4 bg-workspace-secondary/5 rounded-lg">
        <h2 className="text-3xl font-bold text-workspace-primary text-center mb-12">
          Why Choose AI AeroGuardian?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <BenefitItem
            icon={<Wrench className="w-6 h-6 text-workspace-primary" />}
            title="Reduced Maintenance Time"
            description="Cut operational costs with AI-optimized maintenance scheduling"
          />
          <BenefitItem
            icon={<UserCheck className="w-6 h-6 text-workspace-primary" />}
            title="Enhanced Compliance"
            description="Automated tracking of regulatory requirements and standards"
          />
          <BenefitItem
            icon={<Database className="w-6 h-6 text-workspace-primary" />}
            title="Data-Driven Decisions"
            description="Real-time insights for informed maintenance planning"
          />
          <BenefitItem
            icon={<Shield className="w-6 h-6 text-workspace-primary" />}
            title="Improved Safety"
            description="Proactive risk management and safety compliance"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-workspace-primary">
            Ready to Transform Your MRO Operations?
          </h2>
          <p className="text-lg text-workspace-text/80">
            Join the future of aerospace maintenance with AI AeroGuardian
          </p>
          <Button 
            className="bg-workspace-primary hover:bg-workspace-primary/90 text-white px-8 py-6 text-lg mt-6"
            onClick={() => navigate("/login")}
          >
            Contact Sales
          </Button>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg animate-fadeIn">
      <CardHeader className="flex flex-col items-center text-center">
        {icon}
        <CardTitle className="mt-4 text-xl font-semibold text-workspace-text">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center text-workspace-text/80">
        {description}
      </CardContent>
    </Card>
  );
};

const BenefitItem = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-workspace-text mb-2">{title}</h3>
        <p className="text-workspace-text/80">{description}</p>
      </div>
    </div>
  );
};

export default Index;
