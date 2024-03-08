document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('translateButton').addEventListener('click', function(event) {
        var recognition = new webkitSpeechRecognition();
        recognition.lang ="en-Gb";
        recognition.onresult = function(event){
            console.log(event);
            var text = event.results[0][0].transcript;
            document.getElementById("inputText").value = event.results[0][0].transcript;

            // Hitting the API
            fetch('http://127.0.0.1:8000/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('API Response:', data['text']);
                // Assuming outputText2 is an input field
                document.getElementById("outputText2").value = data['text'];
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error processing your request. Please try again later.');
            });
        }
        recognition.start();

        event.preventDefault();
    });
});

window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
