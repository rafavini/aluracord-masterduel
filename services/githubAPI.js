
const githubAPI = async (username)=>{
    return await fetch(`https://api.github.com/users/${username}`, {
      method: 'GET'
    }).then(async (result)=>{
      if (result.status === 200){
        let dados = await result.json()
        return dados
       }
    })
  }

export default githubAPI