       const facts = [
          {
              "statement": "Bears eat beets.",
              "answer": "false",
              "explanation": "Bears... Beets... Battlestar Galactica."
          },
          {
              "statement": "White bear is the best kind of bear.",
              "answer": "false",
              "explanation": "False. Black bear."
          },
          {
              "statement": "For Jim to recreate Dwight's costume costs only 10 dollars.",
              "answer": "false",
              "explanation": "11 dollars."
          },
          {
              "statement": "Jim is not asian.",
              "answer": "true",
              "explanation": "His actor friend is."
          },
          {
              "statement": "Is it truth that Michael singed 'So long Toby' for Toby when he went to Costa Rica?",
              "answer": "false",
              "explanation": "It was 'Good bye, Toby'."
          }
      ];
  
      function hide(element) {
          element.classList.add("hidden");
      }
  
      function show(element) {
          element.classList.remove("hidden");
      }
  
      function disable(button) {
          button.setAttribute("disabled", "");
      } 
  
      function enable(button) {
          button.removeAttribute("disabled");
      }
  
  
      let correct = 0;
      let completed = 0;
      
      let fact;
  
  
      const explanation =  document.getElementById("explanation");
      const nextButton = document.getElementById("next-question");
      const optionButtons = document.getElementById("options").children;
 
      function getNextFact() {
          fact = facts.shift(); // get the first fact in our array (shortening the array)
  
          // set the question text to the current fact's statement
          document.getElementById("statement").textContent = fact.statement;
  
          // hide any previous explanation
          hide(explanation);
  
          for (let option of optionButtons) {
              // clear any previous classes
              option.classList.remove("correct");
              option.classList.remove("incorrect");
              // make sure buttons are enabled
              enable(option);
          }
  
          // disable next-question button
          disable(nextButton);
          
      }
  
      nextButton.addEventListener("click", getNextFact);
  
      for (let option of optionButtons) {
          option.addEventListener("click", e => {
              // When this option is clicked...
  
              // disable all the option buttons
              for (let button of optionButtons) {
                  disable(button); 
              }
  
              // enable the 'next question' button, if we still have facts left
              if (facts.length > 0) {
                  enable(nextButton);
              } else {
                  nextButton.textContent = "No more questions!"
              }
  
              const guess = e.target.value;
              if (guess === fact.answer) {
                  // correct answer!
                  e.target.classList.add("correct");
                  correct += 1;
              } else {
                  // wrong answer!
                  e.target.classList.add("incorrect");
              }
  
              // display the explanation
              explanation.textContent = fact.explanation;
              show(explanation);
              
              // update the score
              completed += 1;
              document.getElementById("correct").textContent = correct;
              document.getElementById("completed").textContent = completed;
  
          })
      }
  
      getNextFact();