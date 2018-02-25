const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {

    let favortite = blogs[0]

    blogs.map(blog => {
        if (blog.likes > favortite.likes) {
            favortite = blog
        }
    })

    return {
        title: favortite.title,
        author: favortite.author,
        likes: favortite.likes
    }

    
}

const mostBlogs = (blogs) => {
    let compare = 0;
    let currentHighest;
    let writers = {};

    for (let i = 0; i < blogs.length; i++) {
        const current = blogs[i].author;
        if (writers[current]===undefined) {
            writers[current] = 1 
        } else {
            writers[current] += 1
        }

        if (writers[current] > compare) {
            compare = writers[current]
            currentHighest = current
        }
    }

    return ({
        author: currentHighest,
        blogs: compare
    })
}

const mostLikes = (blogs) => {
    let compare = 0;
    let currentHighest;
    let writers = {};

    for (let i = 0; i < blogs.length; i++) {
        const current = blogs[i]
        if (writers[current.author]==undefined) {
            writers[current.author] = current.likes
        } else {
            writers[current.author] += current.likes
        }

        if(writers[current.author] > compare) {
            compare = writers[current.author]
            currentHighest = current.author
        }
    }

    return ({
        author: currentHighest,
        likes: compare
    })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}