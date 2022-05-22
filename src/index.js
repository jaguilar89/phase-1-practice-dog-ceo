console.log('%c HI', 'color: firebrick')
const imgUrl = 'https://dog.ceo/api/breeds/image/random/4'
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener('DOMContentLoaded', () => {
    fetch(imgUrl)
    .then(res => res.json())
    .then(data => {
        let pictures = data.message
        pictures.forEach(picUrl => {
            const img = document.createElement('img')
            img.src = `${picUrl}`
            document.querySelector('#dog-image-container').appendChild(img)
        })
    })
    fetch(breedUrl)
    .then(res => res.json())
    .then(data => {
        let breedsObj = data.message

        for (let breed in breedsObj) {
            const li = document.createElement('li')
            li.className = 'top-level-li'
            li.textContent = breed;
            document.querySelector('#dog-breeds').appendChild(li)
            
            if (Array.isArray(breedsObj[breed]) && breedsObj[breed].length !== 0) {
                const subUl = document.createElement('ul')
                subUl.className = 'sub-ul'
                breedsObj[breed].forEach(subBreed => {
                    const subLi = document.createElement('li')
                    subLi.className = 'sub-li'
                    subLi.textContent = subBreed
                    subUl.appendChild(subLi)

                    li.appendChild(subUl)
                })
            }
        }
    });
    document.querySelector('#dog-breeds').addEventListener('click', event => {
        if (event.target.className === 'top-level-li') {
            event.target.style.color = 'blue'
        }
    })

    document.querySelector('#breed-dropdown').addEventListener('change', (event) => {
        const breedList = Array.from(document.querySelector('#dog-breeds').childNodes)
        switch (event.target.value[0]) {
            case 'a':
                filterList('a')
                break;
            case 'b':
                filterList('b')
                break;
            case 'c':
                filterList('c');
                break;
            case 'd':
                filterList('d');
                break;
        }
        function filterList(startLetter) {
         breedList.slice(1).forEach(breed => { //slice from 1st index to remove whitespace, which causes errors with iterator
             if (breed.textContent[0] === startLetter) {
                 breed.style.display = 'block'
             } else {
                 breed.style.display = 'none'
             }
         })
            
        };
    })
})


