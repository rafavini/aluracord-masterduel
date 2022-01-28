import Link from 'next/link'
export default function NotFound() {
    return (
        <>
            <div className="container">
                <div class="flip-box">
                    <div class="flip-box-inner">
                         <div class="flip-box-front">
                                 <img src="404Back.png" />
                        </div>
                        <div class="flip-box-back">
                                <Link href={"/"}><img src="404.jpg"></img></Link>
                        </div>
                    </div>
                </div>
            </div>

            <style global jsx  >{`
                *{
                    background: #101119;
                }
                .container{
                    width: 50vw;
                    padding-right: 150px;
                    height: 50vh;
                    display: flex;
                    
                    justify-content: center;
                    align-items: center;
                }

                .flip-box {
                    width: 300px;
                    height: 200px;
                    perspective: 1000px; 
                  }
                  
                  
                  .flip-box-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    transition: transform 0.8s;
                    transform-style: preserve-3d;
                  }
                  
                  
                  .flip-box:hover .flip-box-inner {
                    transform: rotateY(180deg);
                  }
                  
                  
                  .flip-box-front,
                  .flip-box-back {
                    cursor: pointer;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    -webkit-backface-visibility: hidden; 
                    backface-visibility: hidden;
                  }
                  
                  
                  .flip-box-front {
                    background-color: #13315c;
                    color: black;
                  }
                  
                 
                  .flip-box-back {
                    background-color: #13315c;
                    color: white;
                    transform: rotateY(180deg);
                  } 
			`}</style>

        </>
    );
}