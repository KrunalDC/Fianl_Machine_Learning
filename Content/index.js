$(document).ready(function() {
    $('#emailForm').on('submit', function(event) {
        event.preventDefault();

        const emailText = $('#emailText').val();
        if (emailText === '' || emailText === undefined) {
            validateEmail();
            return false;
        }

        $.ajax({
            url: '/predict',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ text: emailText }),
            dataType: 'json',
            success: function(response) {
                // No need to use await here; the success callback is already asynchronous
                // if (!response.ok) {
                //     console.error(`Server error: ${response.status}`);
                //     return;
                // }
                
                // Check if the result contains the expected data
                if (response.spam !== undefined) {
                    response.spam ? spam() : notspam();
                } else {
                    console.error("Unexpected response format");
                }
                
                console.log('Response object:', response);
            },
            error: function(xhr, status, error) {
                // Handle errors here
                console.error('Error:', error);
            }
        });
    });
});


function spam(){
    Swal.fire({
        title: "Spam",
        text: "Based on the analysis, this email appears to be classified as spam.",
        icon: "warning"
      });
}

function notspam()
{
    Swal.fire({
        title: "Not Spam",
        text: "Based on the analysis, this email appears to be safe and not classified as spam.",
        icon: "success"
      });
}
function validateEmail()
{
    Swal.fire({
        title: "Error",
        text: "Please enter email text",
        icon: "error"
      });
}
function ClearText(){
    const emailTextElement = document.getElementById('emailText');
    emailTextElement.value = '';
}
{/* <script>
    async function classifyEmail() {
        const message = document.getElementById('message').value;
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        });
        const data = await response.json();
        const resultDiv = document.getElementById('result');
        if (data.spam) {
            resultDiv.innerHTML = `Prediction: <strong>Spam</strong><br>Confidence: ${(data.confidence * 100).toFixed(2)}%`;
            resultDiv.style.color = 'red';
        } else {
            resultDiv.innerHTML = `Prediction: <strong>Not Spam</strong><br>Confidence: ${(data.confidence * 100).toFixed(2)}%`;
            resultDiv.style.color = 'green';
        }
    }
</script> */}
