document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    const modalText = document.getElementById("modalText");

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const people = formData.get('people');
        const time = formData.get('time');
        const date = formData.get('date');
        const phone = formData.get('number');

        const message = `Name: ${name}\nEmail: ${email}\nNumber of People: ${people}\nTime: ${time}\nDate: ${date}\nPhone: ${phone}`;
        modalText.innerText = message.replace(/\n/g, '\n');
        modal.style.display = "block";
    });

    function closeModalAndReset() {
        modal.style.display = "none";
        form.reset(); 
    }

    span.onclick = closeModalAndReset;
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModalAndReset();
        }
    }
});
