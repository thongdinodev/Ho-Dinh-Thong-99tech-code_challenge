console.log("hello from client side");
const loginForm = document.querySelector('.login-form');
const signupForm = document.querySelector('.signup-form');

const loginUser = async (data) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/users/login',
            data
        });
        console.log(res);

        if (res.data.status === 'success') {
            alert('Login success!')
            window.setTimeout(() => {
                location.assign('/')
            }, 1500)
        }
    } catch (error) {
        console.log(error);
    }
};

const signupNewUser = async (data) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/users/signup',
            data
        });
        console.log(res);

        if (res.data.status === 'success') {
            alert('Signup success!')
            window.setTimeout(() => {
                location.assign('/')
            }, 1500)
        }
    } catch (error) {
        console.log(error.response.data.message);
    }
}


if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log(email, password);
        loginUser({email, password});
    })
};

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // const formInput = new FormData();

        // formInput.append('email', document.getElementById('email').value);
        // formInput.append('password', document.getElementById('password').value);
        // formInput.append('passwordConfirm', document.getElementById('password-confirm').value);

        // signupNewUser(formInput);
        const email = document.getElementById('email').value;
        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;
        signupNewUser({email, password, passwordConfirm, name});
        
    })
};