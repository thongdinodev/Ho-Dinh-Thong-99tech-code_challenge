const increaseButton = document.getElementById('increase-btn');

const increaseScore = async (data) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: '/api/users/increase',
            data
        });
        console.log(res);

        if (res.data.status === 'success') {
            window.setTimeout(() => {
                location.reload(true);
            }, 250);
        };

    } catch (error) {
        console.log(error.response.data);
    }
};

if (increaseButton) {
    increaseButton.addEventListener('submit', (e) => {
        e.preventDefault();
        const score = +(document.getElementById('score').value);
        increaseScore({score});
    })
}