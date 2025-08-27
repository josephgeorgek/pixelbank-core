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
    <div className="flex flex-col space-y-6 w-64">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex items-start">
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2
                  ${step.isCompleted
                    ? 'bg-primary text-white border-primary'
                    : step.isActive
                    ? 'bg-primary text-white border-primary'
                    : 'bg-gray-100 text-gray-400 border-gray-200'
                  }
                `}
              >
                {step.isCompleted ? '✓' : step.number}
              </div>
              {index < steps.length - 1 && (
                <div className="w-px h-12 bg-gray-200 mt-2"></div>
              )}
            </div>
            <div className="ml-4 flex-1">
              <span
                className={`
                  text-sm font-medium block
                  ${step.isActive ? 'text-gray-900' : 'text-gray-500'}
                `}
              >
                {step.label}
              </span>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default WizardSteps;