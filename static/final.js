
document.addEventListener('DOMContentLoaded', function() {
    let score_equipe = 0;
    const chlngTrueButton = document.getElementById('trueBtnChlnge');
    const chlngFalseButton = document.getElementById('falseBtnChlnge');

    function showMessageChlnge(b) {
        const hiddenElement = document.getElementById('question_chlnge');
        hiddenElement.style.visibility = 'hidden';
        document.getElementById('final_message').style.display = 'flex';
        if (b) {
            document.getElementById('final_message').style.backgroundColor = "greenyellow"
            document.getElementById('message_content').textContent = "CORRECT ! [+5 pt]";
            score_equipe = score_equipe + 5;
        } else {
            document.getElementById('final_message').style.backgroundColor = "lightcoral"
            document.getElementById('message_content').textContent = "INCORRECT !";
        }
        $('body').load('/send_score/' + score_equipe);
        setTimeout(function () {
            window.location.href = '/classement';
            }, 8000);
    }

    chlngTrueButton.addEventListener('click', function() {
        console.log("TRUE");
        showMessageChlnge(true);
    });

    chlngFalseButton.addEventListener('click', function() {
        console.log("FALSE");
        showMessageChlnge(false);
    });
});

function ShowChallenge(i){
    const hiddenElement = document.getElementById('question_chlnge');
    hiddenElement.style.display = 'flex';
    document.getElementById("q1").style.visibility = "hidden";
    document.getElementById("q2").style.visibility = "hidden";
    document.getElementById("q3").style.visibility = "hidden";

    if (i === 1){
        document.getElementById('challenge_input').textContent = "(True ∧ False) ∨ (¬True ⊕ True)) ∧ (False ∨ ¬(True ∧ False) =";
    } else if (i === 2){
        document.getElementById('challenge_input').textContent = "((True ∨ False) ∧ ¬(True ⊕ False)) ∧ (¬True ∨ (False ∧ ¬True)) =";
    } else if (i === 3){
        document.getElementById('challenge_input').textContent = "((True ∨ ¬(False ∧ True)) ⊕ (¬(True ∨ False) ∨ (True ∧ False))) ∧ True =";
    }
}