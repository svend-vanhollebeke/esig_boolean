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

document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const hiddenElement = document.getElementById('hiddenElement');
    const trueButton = document.getElementById('trueButton');
    const falseButton = document.getElementById('falseButton');
    const questionField = document.getElementById('challenge_input');
    const chlngTrueButton = document.getElementById('trueBtnChlnge');
    const chlngFalseButton = document.getElementById('falseBtnChlnge');
    let randomNumber;

    // Fonction pour gérer le clic sur les checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                document.getElementById('score').textContent = "Points cumulés : " + score_equipe;
                randomNumber = Math.floor(Math.random() * 3) + 1;
                if (randomNumber === 1) {
                    hiddenElement.style.display = 'flex';
                    //console.log(pzl7, pzl6, pzl5, pzl4, pzl3, pzl2, pzl1);
                    if (pzl7) {
                        noQuestion = Math.floor(Math.random() * 6) + 18; //0 à 2
                    } else if (pzl6) {
                        noQuestion = Math.floor(Math.random() * 3) + 18; //3 à 5
                    } else if (pzl5) {
                        noQuestion = Math.floor(Math.random() * 6) + 12; //6 à 8
                    } else if (pzl4) {
                        noQuestion = Math.floor(Math.random() * 3) + 12; //9 à 11
                    } else if (pzl3) {
                        noQuestion = Math.floor(Math.random() * 6) + 6; //12 à 14
                    } else if (pzl2) {
                        noQuestion = Math.floor(Math.random() * 3) + 6; //15 à 17
                    } else if (pzl1) {
                        noQuestion = Math.floor(Math.random() * 6) + 0; //18 à 20
                    } else {
                        noQuestion = Math.floor(Math.random() * 3) + 0; //21 à 23
                    }
                    questionField.textContent = questions[noQuestion];
                }
            }
        });
    });

    // Fonction pour masquer l'élément caché
    function hideHiddenElement() {
        hiddenElement.style.display = 'none';
    }

    function showMessage(b) {
        document.getElementById('message').style.display = 'flex';
        if (b) {
            document.getElementById('message').style.backgroundColor = "greenyellow"
            if (score_equipe < 0){
                document.getElementById('message_content').textContent = "CORRECT ! [+1 pt]";
                score_equipe = 0;
            } else {
                document.getElementById('message_content').textContent = "CORRECT !";
            }
        } else {
            document.getElementById('message').style.backgroundColor = "lightcoral"
            document.getElementById('message_content').textContent = "INCORRECT ! [-1 pt]";
            score_equipe = score_equipe - 1;

        }
        setTimeout(function() {
            document.getElementById('message').style.display = 'none';
        }, 500);
        document.getElementById('score').textContent = "Points cumulés : " + score_equipe;
        $('body').load('/send_score/' + score_equipe);
    }

    // Gestion des clics sur les boutons "True" et "False"
    trueButton.addEventListener('click', function() {
        hideHiddenElement();
        if (responses[noQuestion]) {
            showMessage(true);
        } else {
            showMessage(false);
        }
    });
    falseButton.addEventListener('click', function() {
        hideHiddenElement();
        if (responses[noQuestion]) {
            showMessage(false);
        } else {
            showMessage(true);
        }
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
                if ((divCheck.querySelector('#chk1')).checked
                    || (divCheck.querySelector('#chk2')).checked
                    || (divCheck.querySelector('#chk3')).checked
                    || (divCheck.querySelector('#chk4')).checked
                    || (divCheck.querySelector('#chk5')).checked
                    || (divCheck.querySelector('#chk6')).checked
                    || (divCheck.querySelector('#chk7')).checked
                    || (divCheck.querySelector('#chk8')).checked) {

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
                if ((divCheck.querySelector('#chk1')).checked
                    && (divCheck.querySelector('#chk2')).checked
                    && (divCheck.querySelector('#chk3')).checked
                    && (divCheck.querySelector('#chk4')).checked
                    && (divCheck.querySelector('#chk5')).checked
                    && (divCheck.querySelector('#chk6')).checked
                    && (divCheck.querySelector('#chk7')).checked
                    && (divCheck.querySelector('#chk8')).checked) {

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
                if (((divCheck.querySelector('#chk1')).checked || (divCheck.querySelector('#chk2')).checked)
                    || ((divCheck.querySelector('#chk3')).checked && (divCheck.querySelector('#chk4')).checked)
                    || ((divCheck.querySelector('#chk5')).checked || (divCheck.querySelector('#chk6')).checked)
                    || ((divCheck.querySelector('#chk7')).checked && (divCheck.querySelector('#chk8')).checked)) {

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
                if (((divCheck.querySelector('#chk1')).checked
                    || (divCheck.querySelector('#chk2')).checked)
                    && (!(divCheck.querySelector('#chk3')).checked
                    && (divCheck.querySelector('#chk4')).checked)
                    && ((divCheck.querySelector('#chk5')).checked
                    || (divCheck.querySelector('#chk6')).checked)
                    && ((divCheck.querySelector('#chk7')).checked
                    && (divCheck.querySelector('#chk8')).checked)) {

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
                if (((divCheck.querySelector('#chk1')).checked
                        || (divCheck.querySelector('#chk2')).checked)
                    && ((divCheck.querySelector('#chk3')).checked
                        || (divCheck.querySelector('#chk4')).checked)
                    && ((divCheck.querySelector('#chk5')).checked
                        || (divCheck.querySelector('#chk6')).checked)
                    && ((divCheck.querySelector('#chk7')).checked
                        || (divCheck.querySelector('#chk8')).checked)) {
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
                if (((divCheck.querySelector('#chk1')).checked
                    ^ (divCheck.querySelector('#chk2')).checked)
                    && ((divCheck.querySelector('#chk3')).checked
                    ^ (divCheck.querySelector('#chk4')).checked)
                    && !((divCheck.querySelector('#chk5')).checked
                    ^ (divCheck.querySelector('#chk6')).checked)
                    && ((divCheck.querySelector('#chk7')).checked
                    ^ (divCheck.querySelector('#chk8')).checked)) {

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
                if (!(divCheck.querySelector('#chk1')).checked
                        && (divCheck.querySelector('#chk2')).checked
                        && !(divCheck.querySelector('#chk3')).checked
                        && (divCheck.querySelector('#chk4')).checked
                        && !((divCheck.querySelector('#chk5')).checked
                        && !(divCheck.querySelector('#chk6')).checked
                        && (divCheck.querySelector('#chk7')).checked)
                        && (divCheck.querySelector('#chk8')).checked) {

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
                            !(divCheck.querySelector('#chk1')).checked
                            ^
                            (divCheck.querySelector('#chk2')).checked
                        )
                        &&
                        (divCheck.querySelector('#chk3')).checked
                    ) && (
                         (
                             (divCheck.querySelector('#chk4')).checked
                            ||
                            (divCheck.querySelector('#chk5')).checked
                            &&
                            (divCheck.querySelector('#chk6')).checked
                         )
                         ^
                         (
                            (divCheck.querySelector('#chk7')).checked
                            &&
                            !(divCheck.querySelector('#chk8')).checked
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
