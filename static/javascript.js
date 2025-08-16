let score_equipe = 0;
let pzl1 = false;
let pzl2 = false;
let pzl3 = false;
let pzl4 = false;
let pzl5 = false;
let pzl6 = false;
let pzl7 = false;
let pzl8 = false;
let noQuestion;

const questions = [
  // AND (∧)
  "True ∧ True =",
  "True ∧ False =",
  "False ∧ False =",

  // OR (∨)
  "True ∨ True =",
  "True ∨ False =",
  "False ∨ False =",

  // XOR (⊕)
  "True ⊕ True =",
  "True ⊕ False =",
  "False ⊕ False =",

  // NOT (¬)
  "¬True =",
  "¬False =",
  "¬¬False =",

  // Combinations with NOT and AND
  "¬True ∧ True =",
  "¬True ∧ False =",
  "¬False ∧ False =",

  // Combinations with NOT and OR
  "¬True ∨ True =",
  "¬True ∨ False =",
  "¬False ∨ False =",

  // Combinations with NOT and XOR
  "¬True ⊕ True =",
  "¬True ⊕ False =",
  "¬False ⊕ False =",

  "¬(True ⊕ ¬True) =",
  "¬(True ⊕ ¬(False ∧ True)) =",
  "(True ∨ ¬(False ⊕ True)) ⊕ False =",
];

const responses = [
    true,false,false,
    true,true,false,
    false,true,false,
    false,true,false,
    false,false,false,
    true,false,true,
    true,false,true,
    false,true,true
];

function LoadMenu(){
    if (confirm("Êtes-vous sûr de vouloir quitter ?")) {
        $('body').load('/menu');
    }
}

function GoToFinal(){
    window.location.href = '/final';
}

document.addEventListener('DOMContentLoaded', function () {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const hiddenElement = document.getElementById('hiddenElement');
  const trueButton = document.getElementById('trueButton');
  const falseButton = document.getElementById('falseButton');
  const questionField = document.getElementById('challenge_input');
  let randomNumber;

  function maybeAskQuestion() {
    // Si tu veux 1/3 de chances, garde ceci, sinon enlève le if.
    randomNumber = Math.floor(Math.random() * 3) + 1;
    if (randomNumber !== 1) return;

    hiddenElement.style.display = 'flex';

    // Choix de noQuestion : ta logique inchangée
    if (pzl7) {
      noQuestion = Math.floor(Math.random() * 6) + 18;
    } else if (pzl6) {
      noQuestion = Math.floor(Math.random() * 3) + 18;
    } else if (pzl5) {
      noQuestion = Math.floor(Math.random() * 6) + 12;
    } else if (pzl4) {
      noQuestion = Math.floor(Math.random() * 3) + 12;
    } else if (pzl3) {
      noQuestion = Math.floor(Math.random() * 6) + 6;
    } else if (pzl2) {
      noQuestion = Math.floor(Math.random() * 3) + 6;
    } else if (pzl1) {
      noQuestion = Math.floor(Math.random() * 6) + 0;
    } else {
      noQuestion = Math.floor(Math.random() * 3) + 0;
    }
    questionField.textContent = questions[noQuestion];
  }

  function onCheckboxChange(event) {
    // --- ta logique puzzle inchangée, juste mise dans une fonction ---
    const left_container = document.getElementById('container_left');
    const right_container = document.getElementById('container_right');
    const mid_container = document.getElementById('container_mid');
    const checkedBox = event.target;
    const divCheck = checkedBox.parentElement;
    const divCheckId = divCheck.id;
    const container = divCheck.parentElement;
    const containerId = container.id;

    // ⚠️ Idéalement, remplace toutes les occurrences de '#chk1'…'#chk8'
    // par des classes ('.chk1' etc.) dans ton HTML + ce JS.
    // Ex: divCheck.querySelector('.chk1')
    // ----- (le reste de ton code from "if (containerId === 'container_left')" à la fin) -----
    // (Je ne le recolle pas ici pour alléger, mais il reste identique)
    // ---------------------------------------------------------------------------------------

    CheckDonePzl(pzl1,pzl2,pzl3,pzl4,pzl5,pzl6,pzl7,pzl8);
    // Optionnel: mettre à jour le score à chaque changement
    document.getElementById('score').textContent = "Points cumulés : " + score_equipe;

    // Déclenche (ou pas) la question
    maybeAskQuestion();
  }

  // Attache UN SEUL listener par checkbox qui gère tout
  checkboxes.forEach(cb => cb.addEventListener('change', onCheckboxChange));

  // Boutons vrai/faux (ta logique existante)
  trueButton.addEventListener('click', function() {
    hiddenElement.style.display = 'none';
    showMessage(responses[noQuestion] === true);
  });
  falseButton.addEventListener('click', function() {
    hiddenElement.style.display = 'none';
    showMessage(responses[noQuestion] === false);
  });
});



document.querySelectorAll('input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', function(event) {
        const left_container = document.getElementById('container_left');
        const right_container = document.getElementById('container_right');
        const mid_container = document.getElementById('container_mid');
        var checkedBox = event.target;
        var checkboxId = checkedBox.id;
        var divCheck = checkedBox.parentElement;
        var divCheckId = divCheck.id;
        var container = divCheck.parentElement;
        var containerId = container.id;

        if (containerId === "container_left") {
            if (divCheckId === "div1") {
                if ((divCheck.querySelector('.chk1')).checked
                    || (divCheck.querySelector('.chk2')).checked
                    || (divCheck.querySelector('.chk3')).checked
                    || (divCheck.querySelector('.chk4')).checked
                    || (divCheck.querySelector('.chk5')).checked
                    || (divCheck.querySelector('.chk6')).checked
                    || (divCheck.querySelector('.chk7')).checked
                    || (divCheck.querySelector('.chk8')).checked) {

                    setTimeout(function() { container.querySelector('#div1_img').style.opacity = 1; }, 2);
                    setTimeout(function() {
                        setTimeout(function() { container.querySelector('#div2').style.opacity = 1; }, 2);
                    }, 2000);

                    if (!pzl1) {
                        pzl1 = true;
                        score_equipe += 1;
                    }

                } else {
                    if (pzl1) {
                        pzl1 = false;
                        score_equipe -= 1;
                    }
                }

            } else if (divCheckId === "div2") {
                if ((divCheck.querySelector('.chk1')).checked
                    && (divCheck.querySelector('.chk2')).checked
                    && (divCheck.querySelector('.chk3')).checked
                    && (divCheck.querySelector('.chk4')).checked
                    && (divCheck.querySelector('.chk5')).checked
                    && (divCheck.querySelector('.chk6')).checked
                    && (divCheck.querySelector('.chk7')).checked
                    && (divCheck.querySelector('.chk8')).checked) {

                    setTimeout(function() { container.querySelector('#div2_img').style.opacity = 1; }, 2);
                    setTimeout(function() {
                        setTimeout(function() { container.querySelector('#div3').style.opacity = 1; }, 2);
                    }, 2000);

                    if (!pzl2) {
                        pzl2 = true;
                        score_equipe += 1;
                    }

                } else {
                    if (pzl2) {
                        pzl2 = false;
                        score_equipe -= 1;
                    }
                }

            } else if (divCheckId === "div3") {
                if (((divCheck.querySelector('.chk1')).checked || (divCheck.querySelector('.chk2')).checked)
                    || ((divCheck.querySelector('.chk3')).checked && (divCheck.querySelector('.chk4')).checked)
                    || ((divCheck.querySelector('.chk5')).checked || (divCheck.querySelector('.chk6')).checked)
                    || ((divCheck.querySelector('.chk7')).checked && (divCheck.querySelector('.chk8')).checked)) {

                    setTimeout(function() { container.querySelector('#div3_img').style.opacity = 1; }, 2);
                    setTimeout(function() {
                        setTimeout(function() { container.querySelector('#div4').style.opacity = 1; }, 2);
                    }, 2000);

                    if (!pzl3) {
                        pzl3 = true;
                        score_equipe += 1;
                    }

                } else {
                    if (pzl3) {
                        pzl3 = false;
                        score_equipe -= 1;
                    }
                }

            } else if (divCheckId === "div4") {
                if (((divCheck.querySelector('.chk1')).checked
                    || (divCheck.querySelector('.chk2')).checked)
                    && (!(divCheck.querySelector('.chk3')).checked
                    && (divCheck.querySelector('.chk4')).checked)
                    && ((divCheck.querySelector('.chk5')).checked
                    || (divCheck.querySelector('.chk6')).checked)
                    && ((divCheck.querySelector('.chk7')).checked
                    && (divCheck.querySelector('.chk8')).checked)) {

                    setTimeout(function() { container.querySelector('#div4_img').style.opacity = 1; }, 2);
                    setTimeout(function() {
                        setTimeout(function() { right_container.querySelector('#div1').style.opacity = 1; }, 2);
                    }, 2000);

                    if (!pzl4) {
                        pzl4 = true;
                        score_equipe += 1;
                    }

                } else {
                    if (pzl4) {
                        pzl4 = false;
                        score_equipe -= 1;
                    }
                }
            }
        } else if (containerId === "container_right") {
            if (divCheckId === "div1") {
                if (((divCheck.querySelector('.chk1')).checked
                        || (divCheck.querySelector('.chk2')).checked)
                    && ((divCheck.querySelector('.chk3')).checked
                        || (divCheck.querySelector('.chk4')).checked)
                    && ((divCheck.querySelector('.chk5')).checked
                        || (divCheck.querySelector('.chk6')).checked)
                    && ((divCheck.querySelector('.chk7')).checked
                        || (divCheck.querySelector('.chk8')).checked)) {
                    setTimeout(function() { container.querySelector('#div1_img').style.opacity = 1; }, 2);
                    setTimeout(function() {
                        setTimeout(function() { container.querySelector('#div2').style.opacity = 1; }, 2);
                    }, 2000);

                    if (!pzl5) {
                        pzl5 = true;
                        score_equipe += 1;
                    }

                } else {
                    if (pzl5) {
                        pzl5 = false;
                        score_equipe -= 1;
                    }
                }

            } else if (divCheckId === "div2") {
                if (((divCheck.querySelector('.chk1')).checked
                    ^ (divCheck.querySelector('.chk2')).checked)
                    && ((divCheck.querySelector('.chk3')).checked
                    ^ (divCheck.querySelector('.chk4')).checked)
                    && !((divCheck.querySelector('.chk5')).checked
                    ^ (divCheck.querySelector('.chk6')).checked)
                    && ((divCheck.querySelector('.chk7')).checked
                    ^ (divCheck.querySelector('.chk8')).checked)) {

                    setTimeout(function() { container.querySelector('#div2_img').style.opacity = 1; }, 2);
                    setTimeout(function() {
                        setTimeout(function() { container.querySelector('#div3').style.opacity = 1; }, 2);
                    }, 2000);

                    if (!pzl6) {
                        pzl6 = true;
                        score_equipe += 1;
                    }

                } else {
                    if (pzl6) {
                        pzl6 = false;
                        score_equipe -= 1;
                    }
                }

            } else if (divCheckId === "div3") {
                if (!(divCheck.querySelector('.chk1')).checked
                        && (divCheck.querySelector('.chk2')).checked
                        && !(divCheck.querySelector('.chk3')).checked
                        && (divCheck.querySelector('.chk4')).checked
                        && !((divCheck.querySelector('.chk5')).checked
                        && !(divCheck.querySelector('.chk6')).checked
                        && (divCheck.querySelector('.chk7')).checked)
                        && (divCheck.querySelector('.chk8')).checked) {

                    setTimeout(function() { container.querySelector('#div3_img').style.opacity = 1; }, 2);
                    setTimeout(function() {
                        setTimeout(function() { container.querySelector('#div4').style.opacity = 1; }, 2);
                    }, 2000);

                    if (!pzl7) {
                        pzl7 = true;
                        score_equipe += 1;
                    }

                } else {
                    if (pzl7) {
                        pzl7 = false;
                        score_equipe -= 1;
                    }
                }

            } else if (divCheckId === "div4") {
                if (
                    (
                        !(
                            !(divCheck.querySelector('.chk1')).checked
                            ^
                            (divCheck.querySelector('.chk2')).checked
                        )
                        &&
                        (divCheck.querySelector('.chk3')).checked
                    ) && (
                         (
                             (divCheck.querySelector('.chk4')).checked
                            ||
                            (divCheck.querySelector('.chk5')).checked
                            &&
                            (divCheck.querySelector('.chk6')).checked
                         )
                         ^
                         (
                            (divCheck.querySelector('.chk7')).checked
                            &&
                            !(divCheck.querySelector('.chk8')).checked
                         )
                    )
                ) {

                    setTimeout(function() { container.querySelector('#div4_img').style.opacity = 1; }, 2);
                    setTimeout(function() {
                        setTimeout(function() { mid_container.style.opacity = 1; }, 2);
                    }, 2000);

                    if (!pzl8) {
                        pzl8 = true;
                        score_equipe += 1;
                    }

                } else {
                    if (pzl8) {
                        pzl8 = false;
                        score_equipe -= 1;
                    }
                }
            }
        }
        CheckDonePzl(pzl1,pzl2,pzl3,pzl4,pzl5,pzl6,pzl7,pzl8);
    });
});


function CheckDonePzl(pzl1,pzl2,pzl3,pzl4,pzl5,pzl6,pzl7,pzl8){
    const left_container = document.getElementById('container_left');
    const right_container = document.getElementById('container_right');
    const mid_container = document.getElementById('container_mid');

    if (!pzl1) {
        setTimeout(function() { left_container.querySelector('#div1_img').style.opacity = 0; }, 2);
        setTimeout(function() { left_container.querySelector('#div2').style.opacity = 0; }, 2);
        setTimeout(function() { left_container.querySelector('#div2_img').style.opacity = 0; }, 2);
        setTimeout(function() { left_container.querySelector('#div3').style.opacity = 0; }, 2);
        setTimeout(function() { left_container.querySelector('#div3_img').style.opacity = 0; }, 2);
        setTimeout(function() { left_container.querySelector('#div4').style.opacity = 0; }, 2);
        setTimeout(function() { left_container.querySelector('#div4_img').style.opacity = 0; }, 2);

        setTimeout(function() { right_container.querySelector('#div1').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div1_img').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div2').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div2_img').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div3').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div3_img').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div4').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div4_img').style.opacity = 0; }, 2);

        setTimeout(function() { mid_container.style.opacity = 0; }, 2);
    } else if (!pzl2) {
        setTimeout(function() { left_container.querySelector('#div2_img').style.opacity = 0; }, 2);
        setTimeout(function() { left_container.querySelector('#div3').style.opacity = 0; }, 2);
        setTimeout(function() { left_container.querySelector('#div3_img').style.opacity = 0; }, 2);
        setTimeout(function() { left_container.querySelector('#div4').style.opacity = 0; }, 2);
        setTimeout(function() { left_container.querySelector('#div4_img').style.opacity = 0; }, 2);

        setTimeout(function() { right_container.querySelector('#div1').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div1_img').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div2').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div2_img').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div3').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div3_img').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div4').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div4_img').style.opacity = 0; }, 2);

        setTimeout(function() { mid_container.style.opacity = 0; }, 2);
    } else if (!pzl3) {
        setTimeout(function() { left_container.querySelector('#div3_img').style.opacity = 0; }, 2);
        setTimeout(function() { left_container.querySelector('#div4').style.opacity = 0; }, 2);
        setTimeout(function() { left_container.querySelector('#div4_img').style.opacity = 0; }, 2);

        setTimeout(function() { right_container.querySelector('#div1').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div1_img').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div2').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div2_img').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div3').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div3_img').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div4').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div4_img').style.opacity = 0; }, 2);

        setTimeout(function() { mid_container.style.opacity = 0; }, 2);
    } else if (!pzl4) {
        setTimeout(function() { left_container.querySelector('#div4_img').style.opacity = 0; }, 2);

        setTimeout(function() { right_container.querySelector('#div1').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div1_img').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div2').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div2_img').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div3').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div3_img').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div4').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div4_img').style.opacity = 0; }, 2);

        setTimeout(function() { mid_container.style.opacity = 0; }, 2);
    } else if (!pzl5) {
        setTimeout(function() { right_container.querySelector('#div1_img').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div2').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div2_img').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div3').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div3_img').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div4').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div4_img').style.opacity = 0; }, 2);

        setTimeout(function() { mid_container.style.opacity = 0; }, 2);
    } else if (!pzl6) {
        setTimeout(function() { right_container.querySelector('#div2_img').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div3').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div3_img').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div4').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div4_img').style.opacity = 0; }, 2);

        setTimeout(function() { mid_container.style.opacity = 0; }, 2);
    } else if (!pzl7) {
        setTimeout(function() { right_container.querySelector('#div3_img').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div4').style.opacity = 0; }, 2);
        setTimeout(function() { right_container.querySelector('#div4_img').style.opacity = 0; }, 2);

        setTimeout(function() { mid_container.style.opacity = 0; }, 2);
    } else if (!pzl8) {
        setTimeout(function () {right_container.querySelector('#div4_img').style.opacity = 0;}, 2);
        setTimeout(function () {mid_container.style.opacity = 0;}, 2);
    }

    if (pzl1) {
        setTimeout(function() { left_container.querySelector('#div1_img').style.opacity = 1; }, 2);
        setTimeout(function() { left_container.querySelector('#div2').style.opacity = 1; }, 2);

    }
    if (pzl2 && pzl1) {
        setTimeout(function() { left_container.querySelector('#div2_img').style.opacity = 1; }, 2);
        setTimeout(function() { left_container.querySelector('#div3').style.opacity = 1; }, 2);

    }
    if (pzl3 && pzl2 && pzl1) {
        setTimeout(function() { left_container.querySelector('#div3_img').style.opacity = 1; }, 2);
        setTimeout(function() { left_container.querySelector('#div4').style.opacity = 1; }, 2);

    }
    if (pzl4 && pzl3 && pzl2 && pzl1) {
        setTimeout(function() { left_container.querySelector('#div4_img').style.opacity = 1; }, 2);
        setTimeout(function() { right_container.querySelector('#div1').style.opacity = 1; }, 2);

    }
    if (pzl5 && pzl4 && pzl3 && pzl2 && pzl1) {
        setTimeout(function() { right_container.querySelector('#div1_img').style.opacity = 1; }, 2);
        setTimeout(function() { right_container.querySelector('#div2').style.opacity = 1; }, 2);

    }
    if (pzl6 && pzl5 && pzl4 && pzl3 && pzl2 && pzl1) {
        setTimeout(function() { right_container.querySelector('#div2_img').style.opacity = 1; }, 2);
        setTimeout(function() { right_container.querySelector('#div3').style.opacity = 1; }, 2);

    }
    if (pzl7 && pzl6 && pzl5 && pzl4 && pzl3 && pzl2 && pzl1) {
        setTimeout(function() { right_container.querySelector('#div3_img').style.opacity = 1; }, 2);
        setTimeout(function() { right_container.querySelector('#div4').style.opacity = 1; }, 2);

    }
    if (pzl8 && pzl7 && pzl6 && pzl5 && pzl4 && pzl3 && pzl2 && pzl1) {
        setTimeout(function () {right_container.querySelector('#div4_img').style.opacity = 1;}, 2);
        setTimeout(function () {mid_container.style.opacity = 1;}, 2);
    }
}
