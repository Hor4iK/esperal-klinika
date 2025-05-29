//search function
const searchArray = document.querySelectorAll('.search');
if (searchArray) {
  searchArray.forEach(search => {
    const input = search.querySelector('input');
    input.addEventListener('focus', evt => {
      search.classList.add('open');
    })
    input.addEventListener('blur', evt => {
      search.classList.remove('open');
    })
  })
}
