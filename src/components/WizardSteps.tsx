import React from 'react';

interface Step {
  number: number;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
}

interface WizardStepsProps {
  steps: Step[];
}

const WizardSteps: React.FC<WizardStepsProps> = ({ steps }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex items-center">
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2
                ${step.isCompleted
                  ? 'bg-primary text-primary-foreground border-primary'
                  : step.isActive
                  ? 'bg-background text-primary border-primary'
                  : 'bg-muted text-muted-foreground border-muted'
                }
              `}
            >
              {step.isCompleted ? '✓' : step.number}
            </div>
            <span
              className={`
                ml-2 text-sm font-medium
                ${step.isActive ? 'text-foreground' : 'text-muted-foreground'}
              `}
            >
              {step.label}
            </span>
          </div>
          
          {index < steps.length - 1 && (
            <div className="flex-1 mx-4">
              <div
                className={`
                  h-0.5
                  ${step.isCompleted ? 'bg-primary' : 'bg-muted'}
                `}
              ></div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default WizardSteps;