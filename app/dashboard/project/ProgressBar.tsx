interface ProgressBarProps {
    steps: { id: number; name: string }[];
    currentStep: number;
}

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
    return (
        <div className="mt-6">
            <div className="flex items-center justify-between w-full">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                        <div className={`
                            relative flex items-center justify-center w-10 h-10 rounded-full 
                            font-medium text-sm transition-all duration-300 ease-in-out
                            ${step.id === currentStep
                                ? 'bg-blue-500 text-white shadow-lg scale-110'
                                : step.id < currentStep
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-400'
                            }
                            ${step.id <= currentStep ? 'ring-2 ring-blue-100 ring-offset-2' : ''}
                        `}>
                            {step.id < currentStep ? (
                                <svg
                                    className="w-5 h-5 transition-transform duration-300 ease-in-out transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            ) : (
                                <span className={`
                                    transition-all duration-300
                                    ${step.id === currentStep ? 'scale-110' : ''}
                                `}>
                                    {step.id}
                                </span>
                            )}
                            {step.id === currentStep && (
                                <div className="absolute -inset-1 bg-blue-500/20 rounded-full animate-pulse" />
                            )}
                        </div>
                        <span className={`
                            ml-3 text-sm font-medium transition-all duration-300
                            ${step.id === currentStep
                                ? 'text-blue-500 scale-105'
                                : step.id < currentStep
                                    ? 'text-blue-500'
                                    : 'text-gray-400'
                            }
                        `}>
                            {step.name}
                        </span>
                        {index < steps.length - 1 && (
                            <div className="mx-3 flex items-center">
                                <div className={`
                                    w-16 h-[2px] transition-all duration-300 ease-in-out
                                    ${step.id < currentStep
                                        ? 'bg-blue-500'
                                        : step.id === currentStep
                                            ? 'bg-gradient-to-r from-blue-500 to-gray-200'
                                            : 'bg-gray-200'
                                    }
                                `} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}