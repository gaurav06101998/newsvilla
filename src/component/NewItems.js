import React from 'react'

const NewItems =(props)=> {

    let {tittle, discription, imageUrl, newsUrl, author, date, source} = props;

    return (
      <div>
       <div className="card h-100" >
  <img src={imageUrl? imageUrl:"https://as1.ftcdn.net/v2/jpg/03/27/55/60/1000_F_327556002_99c7QmZmwocLwF7ywQ68ChZaBry1DbtD.jpg"} className="card-img-top" alt="..." />
  <div className="card-body ">
    <h5 className="card-title">{tittle}<span className="badge rounded-pill text-bg-primary">{source}</span></h5>
    <p className="card-text">{discription}</p>
    <p className="card-text"><small className="text-body-secondary">By {author ? author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
  </div>
</div>

      </div>
      
    )

}

export default NewItems
