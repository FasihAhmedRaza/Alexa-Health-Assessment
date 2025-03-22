const Alexa = require('ask-sdk-core');

// Comprehensive question structure with nested follow-up questions
const ASSESSMENT_QUESTIONS = [
  // Activity assessment questions
  {
    id: "walkIndoors",
    text: "Can you walk indoors?",
    followUp: null
  },
  {
    id: "walkBlocks",
    text: "Can you walk 1 to 2 blocks on ground level?",
    followUp: null
  },
  {
    id: "climbStairs",
    text: "Can you climb a flight of stairs or walk up a hill?",
    followUp: null
  },
  {
    id: "runDistance",
    text: "Can you run a short distance?",
    followUp: null
  },
  {
    id: "lightHousework",
    text: "Can you do light house work like dusting or washing dishes?",
    followUp: null
  },
  {
    id: "moderateHousework",
    text: "Can you do moderate house work like sweeping or carrying groceries?",
    followUp: null
  },
  {
    id: "heavyHousework",
    text: "Can you do heavy housework like moving heavy furniture?",
    followUp: null
  },
  {
    id: "yardwork",
    text: "Can you do yardwork?",
    followUp: null
  },
  {
    id: "sexualRelations",
    text: "Can you have sexual relations?",
    followUp: null
  },
  {
    id: "moderateRecreation",
    text: "Can you participate in moderate recreational activities like golfing or dancing?",
    followUp: null
  },
  {
    id: "strenuousSports",
    text: "Can you participate in strenuous sports like swimming, skiing, or baseball?",
    followUp: null
  },
  
  // Sleep apnea questions
  {
    id: "sleepApnea",
    text: "Do you have sleep apnea?",
    followUp: {
      yes: [
        {
          id: "cpapUse",
          text: "Do you use a CPAP or BiPAP machine?",
          followUp: {
            yes: [
              {
                id: "cpapFrequency",
                text: "How many nights per week do you use it?",
                followUp: null,
                expects: "number"
              }
            ],
            no: []
          }
        }
      ],
      no: [
        {
          id: "snore",
          text: "Do you snore loudly?",
          followUp: null
        },
        {
          id: "tired",
          text: "Do you often feel tired, fatigued, or sleepy during the daytime?",
          followUp: null
        },
        {
          id: "stopBreathing",
          text: "Has anyone observed you stop breathing during sleep?",
          followUp: null
        }
      ]
    }
  },
  
  // Help with daily tasks
  {
    id: "requireHelp",
    text: "Do you require help from others, including family or caretakers, to complete daily tasks?",
    followUp: {
      yes: [
        {
          id: "completeTasks",
          text: "Are you able to complete tasks such as bathing, using the bathroom, and eating on your own?",
          followUp: null
        }
      ],
      no: []
    }
  },
  
  // Blood pressure questions
  {
    id: "highBloodPressure",
    text: "Do you have high blood pressure?",
    followUp: {
      yes: [
        {
          id: "bpMedications",
          text: "Are you on blood pressure medications?",
          followUp: {
            yes: [
              {
                id: "bpControlled",
                text: "Is your blood pressure well controlled on these medications?",
                followUp: null
              }
            ],
            no: []
          }
        }
      ],
      no: []
    }
  },
  
  // Blood clot questions
  {
    id: "bloodClot",
    text: "Have you ever had a blood clot, stroke, or transient ischemic attack?",
    followUp: {
      yes: [
        {
          id: "recentClot",
          text: "Was it in the last 3 months?",
          followUp: {
            yes: [
              {
                id: "surgicalIntervention",
                text: "Was surgical intervention, such as thrombectomy, required?",
                followUp: null
              }
            ],
            no: []
          }
        },
        {
          id: "longTermComplications",
          text: "Do you have any long term complications such as weakness or speech problems?",
          followUp: {
            yes: [
              {
                id: "weaknessDescription",
                text: "Describe your weakness",
                followUp: null,
                expects: "text"
              }
            ],
            no: []
          }
        }
      ],
      no: []
    }
  },
  
  // Blood thinners
  {
    id: "bloodThinners",
    text: "Are you currently on blood thinners, such as aspirin, coumadin, or plavix?",
    followUp: {
      yes: [
        {
          id: "whichMedications",
          text: "Which medications and which doses do you take?",
          followUp: null,
          expects: "text"
        },
        {
          id: "excessiveBleeding",
          text: "Have you ever experienced excessive bleeding or bruising from these medications?",
          followUp: null
        }
      ],
      no: []
    }
  },
  
  // Bleeding disorder
  {
    id: "bleedingDisorder",
    text: "Have you ever been diagnosed with a bleeding disorder?",
    followUp: {
      yes: [
        {
          id: "whichDisorder",
          text: "Which bleeding disorder do you have?",
          followUp: null,
          expects: "text"
        }
      ],
      no: []
    }
  },
  
  // Heart attack
  {
    id: "heartAttack",
    text: "Have you ever had a heart attack or angina?",
    followUp: {
      yes: [
        {
          id: "hasStent",
          text: "Do you have a stent?",
          followUp: null
        },
        {
          id: "hasGraft",
          text: "Do you have a graft?",
          followUp: null
        },
        {
          id: "hasPacemaker",
          text: "Do you have a pacemaker?",
          followUp: null
        }
      ],
      no: []
    }
  },
  
  // Heart failure
  {
    id: "heartFailure",
    text: "Have you ever been diagnosed with congestive heart failure?",
    followUp: null
  },
  
  // Diabetes
  {
    id: "diabetes",
    text: "Do you have diabetes?",
    followUp: {
      yes: [
        {
          id: "requireInsulin",
          text: "Do you require insulin at home?",
          followUp: null
        }
      ],
      no: []
    }
  },
  
  // Motion sickness
  {
    id: "motionSickness",
    text: "Do you have a history of motion sickness or post-operative nausea and vomiting?",
    followUp: {
      yes: [
        {
          id: "postOpOpioids",
          text: "Have you ever required postoperative opioids?",
          followUp: null
        }
      ],
      no: []
    }
  },
  
  // Kidney disease
  {
    id: "kidneyDisease",
    text: "Do you have kidney disease?",
    followUp: {
      yes: [
        {
          id: "dialysisDependent",
          text: "Is it dialysis dependent?",
          followUp: {
            yes: [
              {
                id: "dialysisFrequency",
                text: "How many times per week are you undergoing dialysis?",
                followUp: null,
                expects: "number"
              }
            ],
            no: []
          }
        },
        {
          id: "kidneyMedications",
          text: "Are you on any medications to manage your kidney disease?",
          followUp: {
            yes: [
              {
                id: "whichKidneyMeds",
                text: "Which medications do you take for your kidney disease?",
                followUp: null,
                expects: "text"
              }
            ],
            no: []
          }
        }
      ],
      no: []
    }
  },
  
  // Liver disease
  {
    id: "liverDisease",
    text: "Do you have liver disease that has resulted in ascites?",
    followUp: null
  },
  
  // Pregnancy
  {
    id: "pregnant",
    text: "Are you pregnant or is there a chance of you being pregnant?",
    followUp: {
      yes: [
        {
          id: "pregnancyTest",
          text: "Have you taken a pregnancy test as confirmation?",
          followUp: {
            yes: [
              {
                id: "howFarAlong",
                text: "How far along are you in your pregnancy?",
                followUp: null,
                expects: "text"
              }
            ],
            no: []
          }
        }
      ],
      no: []
    }
  },
  
  // Smoking
  {
    id: "smoke",
    text: "Do you currently smoke cigarettes?",
    followUp: {
      yes: [
        {
          id: "cigarettesPerDay",
          text: "How many cigarettes per day do you smoke?",
          followUp: null,
          expects: "number"
        }
      ],
      no: []
    }
  },
  
  // Respiratory conditions
  {
    id: "respiratoryCondition",
    text: "Do you have COPD, asthma, or emphysema?",
    followUp: {
      yes: [
        {
          id: "dailyInhaler",
          text: "Do you use a daily inhaler?",
          followUp: null
        },
        {
          id: "activeCough",
          text: "Do you have an active cough, wheezing, or shortness of breath?",
          followUp: null
        }
      ],
      no: []
    }
  },
  
  // Respiratory infection
  {
    id: "respiratoryInfection",
    text: "Have you had a respiratory infection in the last month that required antibiotic use?",
    followUp: null
  },
  
  // Steroids
  {
    id: "steroids",
    text: "Do you currently require steroids for a chronic condition?",
    followUp: null
  },
  
  // Alcohol
  {
    id: "alcohol",
    text: "Do you currently drink alcohol?",
    followUp: {
      yes: [
        {
          id: "drinksPerWeek",
          text: "How many drinks do you drink per week?",
          followUp: null,
          expects: "number"
        },
        {
          id: "lastDrink",
          text: "How long ago was your last drink?",
          followUp: null,
          expects: "text"
        }
      ],
      no: []
    }
  },
  
  // Recreational drugs
  {
    id: "recreationalDrugs",
    text: "Do you use recreational drugs?",
    followUp: {
      yes: [
        {
          id: "opioidUse",
          text: "Do you use opioids, such as morphine, dilaudid, or heroin, on a regular basis?",
          followUp: {
            yes: [
              {
                id: "postOpOpioids",
                text: "Have you ever required post-operative opioids?",
                followUp: null
              }
            ],
            no: []
          }
        },
        {
          id: "ivDrugUse",
          text: "Do you use IV drugs?",
          followUp: {
            yes: [
              {
                id: "ivDrugInfection",
                text: "Have you ever had an infection related to IV drug use?",
                followUp: null
              }
            ],
            no: []
          }
        }
      ],
      no: []
    }
  },
  
  // BMI question
  {
    id: "highBMI",
    text: "Is your BMI greater than 35 kilograms per meter squared?",
    followUp: null
  },
  
  // Neck circumference
  {
    id: "largeNeck",
    text: "Is your neck circumference over 40 centimeters?",
    followUp: null
  },
  
  // Peripheral vascular disease
  {
    id: "pvd",
    text: "Do you have peripheral vascular disease?",
    followUp: null
  },
  
  // Immunosuppression
  {
    id: "immunosuppression",
    text: "Are you currently on immunosuppression such as chemotherapy or steroids?",
    followUp: null
  }
];

// Launch request handler
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = 'Welcome to the Health Assessment. I will ask you a series of health-related questions to evaluate your condition. You can answer with Yes or No to most questions. For some questions, I may ask for numbers or additional details. To begin the assessment, say "start assessment".';
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};

// Start assessment intent handler
const StartAssessmentIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StartAssessmentIntent';
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    
    // Initialize the question queue with main questions
    sessionAttributes.questionQueue = [...ASSESSMENT_QUESTIONS];
    sessionAttributes.results = [];
    sessionAttributes.currentQuestion = sessionAttributes.questionQueue.shift();
    
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
    
    const speakOutput = `Let's begin the health assessment. ${sessionAttributes.currentQuestion.text}`;
    
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};

// Yes Intent handler
const YesIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent';
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    
    // If assessment hasn't started yet
    if (!sessionAttributes.currentQuestion) {
      return StartAssessmentIntentHandler.handle(handlerInput);
    }
    
    // Record the "Yes" answer
    if (!sessionAttributes.results) {
      sessionAttributes.results = [];
    }
    
    sessionAttributes.results.push({
      questionId: sessionAttributes.currentQuestion.id,
      question: sessionAttributes.currentQuestion.text,
      answer: "Yes"
    });
    
    // Process follow-up questions for "Yes" response
    if (sessionAttributes.currentQuestion.followUp && 
        sessionAttributes.currentQuestion.followUp.yes) {
      // Add follow-up questions to the beginning of the queue
      sessionAttributes.questionQueue = [
        ...sessionAttributes.currentQuestion.followUp.yes,
        ...sessionAttributes.questionQueue
      ];
    }
    
    return processNextQuestion(handlerInput, sessionAttributes);
  }
};

// No Intent handler
const NoIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent';
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    
    // If assessment hasn't started yet
    if (!sessionAttributes.currentQuestion) {
      return handlerInput.responseBuilder
        .speak("You need to start the assessment first. Say 'start assessment' to begin.")
        .reprompt("Say 'start assessment' to begin.")
        .getResponse();
    }
    
    // Record the "No" answer
    if (!sessionAttributes.results) {
      sessionAttributes.results = [];
    }
    
    sessionAttributes.results.push({
      questionId: sessionAttributes.currentQuestion.id,
      question: sessionAttributes.currentQuestion.text,
      answer: "No"
    });
    
    // Process follow-up questions for "No" response
    if (sessionAttributes.currentQuestion.followUp && 
        sessionAttributes.currentQuestion.followUp.no) {
      // Add follow-up questions to the beginning of the queue
      sessionAttributes.questionQueue = [
        ...sessionAttributes.currentQuestion.followUp.no,
        ...sessionAttributes.questionQueue
      ];
    }
    
    return processNextQuestion(handlerInput, sessionAttributes);
  }
};

// Text answer handler for questions expecting text responses
const TextAnswerIntentHandler = {
  canHandle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TextAnswerIntent'
      && sessionAttributes.currentQuestion
      && sessionAttributes.currentQuestion.expects === 'text';
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const textValue = handlerInput.requestEnvelope.request.intent.slots.answer.value;
    
    // Record the text answer
    sessionAttributes.results.push({
      questionId: sessionAttributes.currentQuestion.id,
      question: sessionAttributes.currentQuestion.text,
      answer: textValue
    });
    
    return processNextQuestion(handlerInput, sessionAttributes);
  }
};

// Number answer handler for questions expecting numerical responses
const NumberAnswerIntentHandler = {
  canHandle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NumberIntent'
      && sessionAttributes.currentQuestion
      && sessionAttributes.currentQuestion.expects === 'number';
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const numberValue = handlerInput.requestEnvelope.request.intent.slots.number.value;
    
    // Record the number answer
    sessionAttributes.results.push({
      questionId: sessionAttributes.currentQuestion.id,
      question: sessionAttributes.currentQuestion.text,
      answer: numberValue
    });
    
    return processNextQuestion(handlerInput, sessionAttributes);
  }
};

// Unsure intent handler
const UnsureIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'UnsureIntent';
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    
    // If assessment hasn't started yet
    if (!sessionAttributes.currentQuestion) {
      return handlerInput.responseBuilder
        .speak("You need to start the assessment first. Say 'start assessment' to begin.")
        .reprompt("Say 'start assessment' to begin.")
        .getResponse();
    }
    
    // Record the "Unsure" answer
    sessionAttributes.results.push({
      questionId: sessionAttributes.currentQuestion.id,
      question: sessionAttributes.currentQuestion.text,
      answer: "Unsure"
    });
    
    return processNextQuestion(handlerInput, sessionAttributes);
  }
};

// Helper function to process the next question or finish assessment
function processNextQuestion(handlerInput, sessionAttributes) {
  // Get the next question from the queue
  sessionAttributes.currentQuestion = sessionAttributes.questionQueue.shift();
  
  // Check if we've reached the end of the assessment
  if (!sessionAttributes.currentQuestion) {
    const results = sessionAttributes.results;
    let summaryText = "Thank you for completing the health assessment. Here's a summary of your key responses: ";
    
    // Adding only the most important responses to the summary to avoid making it too long
    const keyQuestions = ["sleepApnea", "highBloodPressure", "bloodClot", "heartAttack", "diabetes", "kidneyDisease"];
    const keyResponses = results.filter(result => keyQuestions.includes(result.questionId));
    
    keyResponses.forEach(result => {
      summaryText += `For ${result.question} you answered ${result.answer}. `;
    });
    
    summaryText += "All of your responses have been recorded. Is there anything specific you'd like to review?";
    
    // Clear session data but keep results for potential review
    const completeResults = [...sessionAttributes.results];
    sessionAttributes.currentQuestion = undefined;
    sessionAttributes.questionQueue = undefined;
    sessionAttributes.completeResults = completeResults;
    sessionAttributes.results = undefined;
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
    
    return handlerInput.responseBuilder
      .speak(summaryText)
      .reprompt("Is there anything specific from your assessment you'd like to review?")
      .getResponse();
  }
  
  // Determine what prompt to use based on the question type
  let promptText = sessionAttributes.currentQuestion.text;
  let repromptText = "Please answer with yes or no.";
  
  if (sessionAttributes.currentQuestion.expects === 'number') {
    repromptText = "Please provide a number.";
  } else if (sessionAttributes.currentQuestion.expects === 'text') {
    repromptText = "Please provide your answer.";
  }
  
  // Update session
  handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
  
  return handlerInput.responseBuilder
    .speak(promptText)
    .reprompt(repromptText)
    .getResponse();
}

// Help Intent handler
const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = 'This is a comprehensive health assessment. I will ask you questions about your health and medical history. For most questions, you can answer with Yes or No. For some questions, I may ask for numerical values or details. If you are unsure about an answer, you can say "I don\'t know" or "unsure". To start or continue the assessment, say "start assessment".';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};

// Cancel and Stop Intent handler
const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
        || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speakOutput = 'Thank you for using the Health Assessment. Your responses have been saved. Goodbye!';
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  }
};

// FallbackIntent handler
const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    let speakOutput = "I'm not sure how to help with that. ";
    
    if (sessionAttributes.currentQuestion) {
      if (sessionAttributes.currentQuestion.expects === 'number') {
        speakOutput += "Please provide a number for the question: " + sessionAttributes.currentQuestion.text;
      } else if (sessionAttributes.currentQuestion.expects === 'text') {
        speakOutput += "Please provide an answer for: " + sessionAttributes.currentQuestion.text;
      } else {
        speakOutput += "Please answer with Yes or No to the question: " + sessionAttributes.currentQuestion.text;
      }
    } else {
      speakOutput += "You can say 'start assessment' to begin the health check, or say 'help' for more information.";
    }

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};

// Error handler
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`~~~~ Error handled: ${error.stack}`);
    const speakOutput = `Sorry, I had trouble processing that. Let's try again. Please answer the current question or say "help" for assistance.`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};

// Session ended request handler
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    return handlerInput.responseBuilder.getResponse();
  }
};

// Export handler function
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    StartAssessmentIntentHandler,
    YesIntentHandler,
    NoIntentHandler,
    TextAnswerIntentHandler,
    NumberAnswerIntentHandler,
    UnsureIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
