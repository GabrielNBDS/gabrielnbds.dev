import { useState } from 'react'

const useSteps = (initialStep = 0) => {
  const [step, setStep] = useState(initialStep)

  function nextStep() {
    setStep(currentStep => currentStep + 1)
  }

  function previousStep() {
    setStep(currentStep => currentStep - 1)
  }

  function reset() {
    setStep(initialStep)
  }

  return { step, setStep, nextStep, previousStep, reset }
}

export default useSteps
