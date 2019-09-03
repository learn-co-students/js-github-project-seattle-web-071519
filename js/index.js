document.addEventListener("DOMContentLoaded", main)

function main() {
    let searchForm = document.querySelector("#github-form")
    searchForm.onsubmit = (e) => {
        // debugger
        e.preventDefault()
        if (e.target.children[1].checked) {
            fetchRepos(e)
        } else {
            fetchUsers(e)
        }
    }
}

function fetchUsers(e) {
    // e.preventDefaut()
    let searchTerm = e.target.children[0].value
    fetch(`https://api.github.com/search/users?q=${searchTerm}`)
    .then(response => response.json())
    .then(userData => showSearchResults(userData))
    .catch(errors => console.log(errors))
    // debugger
}

function showSearchResults(userData) {
    // debugger
    let userList = document.querySelector("#user-list")
    while (userList.firstChild) {
        userList.firstChild.remove()
    }
    userData.items.forEach(user => {
        // debugger
        let searchLi = document.createElement("li")
        let searchResult = document.createElement("div")
        let userName = document.createElement("h3")
        userName.innerText = `${user.login}`

        // let userAccount = document.createElement("a")
        // userAccount.innerText = "GitHub Repos"
        userName.addEventListener("click", fetchUserRepos(user))

        let userAvatar = document.createElement("img")
        userAvatar.src = user.avatar_url


        //append stuff
        searchResult.appendChild(userName)
        // userName.appendChild(userAccount)
        searchResult.appendChild(userAvatar)
        searchLi.appendChild(searchResult)
        userList.appendChild(searchLi)
    })
}

function fetchUserRepos(user) {
    return function(e) {
        // debugger
        let userName = e.target.innerText
        fetch(`https://api.github.com/users/${userName}/repos`)
        .then(response => response.json())
        .then(userData => showRepos(userData))
        .catch(errors => console.log(errors))
    }
}

function showRepos(userData) {
    debugger
    let reposList = document.querySelector("#repos-list")
    while (reposList.firstChild) {
        reposList.firstChild.remove()
    }

    let reposHeading = document.createElement("h2")
    reposHeading.innerText = "Repos"

    reposList.append(reposHeading)

    userData.forEach(repo => {
        let repoLi = document.createElement("li")
        repoLi.innerText = `${repo.name}`

        reposList.appendChild(repoLi)
    })
}

function fetchRepos(e) {
    let searchTerm = e.target.children[0].value
    fetch(`https://api.github.com/search/repositories?q=${searchTerm}`)
    .then(response => response.json())
    .then(repoData => showRepos(repoData.items))
    .catch(errors => console.log(errors))
}