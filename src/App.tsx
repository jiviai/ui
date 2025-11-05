import { useState } from "react";
import { Button } from "../lib/components/ui/button";
import { Icon } from "../lib/components/icon";
import {
  Stepper,
  StepperBadge,
  StepperBadgeGroup,
  StepperContentWrapper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperLabel,
  StepperNav,
  StepperSeparator,
  StepperTextWrapper,
  StepperTitle,
  StepperTrigger,
} from "../lib/components/ui/stepper";

const steps = [
  { title: "User Details", icon: "person", description: "Enter your personal information" },
  { title: "Payment Info", icon: "credit_card", description: "Add payment method" },
  { title: "Auth OTP", icon: "lock", description: "Verify your identity" },
  { title: "Preview Form", icon: "list_alt", description: "Review and submit" },
];

export default function App() {
  const [verticalStep, setVerticalStep] = useState(2);

  return (
    <div className="min-h-screen bg-ds-grey-50 p-8">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Horizontal Stepper */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Horizontal Stepper</h2>
          <Stepper
            value={verticalStep}
            onValueChange={setVerticalStep}
            variant="vertical"
            size="md"
            showConnector={true}
            indicators={{
              completed: <Icon name="check" variant="filled" size="16px" />,
            }}
          >
            <StepperNav>
              {steps.map((step, index) => (
                <StepperItem key={index} step={index + 1} className="flex-1">
                  <StepperTrigger>
                    <StepperIndicator>
                      <Icon name={step.icon} variant="filled" size="16px" />
                    </StepperIndicator>
                    <StepperContentWrapper>
                      <StepperTextWrapper>
                        <StepperLabel>Step {index + 1}</StepperLabel>
                        <StepperTitle>{step.title}</StepperTitle>
                        <StepperDescription>{step.description}</StepperDescription>
                      </StepperTextWrapper>
                      <StepperBadgeGroup>
                        <StepperBadge status="warning" icon="trending_up" iconVariant="filled">In Progress</StepperBadge>
                        <StepperBadge status="success" icon="check_circle" iconVariant="filled">Completed</StepperBadge>
                        <StepperBadge status="default" icon="schedule" iconVariant="filled">Pending</StepperBadge>
                      </StepperBadgeGroup>
                    </StepperContentWrapper>
                  </StepperTrigger>
                  {index < steps.length - 1 && <StepperSeparator />}
                </StepperItem>
              ))}
            </StepperNav>

            <div className="flex items-center justify-between gap-2.5 mt-8">
              <Button
                variant="secondary"
                onClick={() => setVerticalStep((prev) => prev - 1)}
                disabled={verticalStep === 1}
              >
                Previous
              </Button>
              <Button
                variant="primary"
                onClick={() => setVerticalStep((prev) => prev + 1)}
                disabled={verticalStep === steps.length}
              >
                {verticalStep === steps.length ? "Finish" : "Next"}
              </Button>
            </div>
          </Stepper>
        </div>
      </div>
    </div>
  );
}
