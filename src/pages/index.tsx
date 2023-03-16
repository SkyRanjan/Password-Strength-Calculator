import Head from 'next/head'
import {useEffect, useState} from "react";
import calculatePasswordStrength from "@/utils/crackTime";
import {ZxcvbnResult} from "@zxcvbn-ts/core";


const HomePage = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [result, setResult] = useState<ZxcvbnResult|null>(null)
    useEffect(() => {
        if(searchTerm?.length > 0) {
            calculatePasswordStrength(searchTerm).then((r) => setResult(r));
        }
    }, [searchTerm]);
    let Time='';
    if(result)
    {
      if (result.crackTimesDisplay) {
        Time = result.crackTimesDisplay.offlineSlowHashing1e4PerSecond;
      }  
    }
    

  return (
    <>
      <Head>
        <title>Password Strength Checker</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1>
          <div className='bg-teal-400 text-center text-[2rem]'>
            LETS CHECK PASSWORD STRENGTH
          </div>
        </h1>
      </header>
      <main >
        <div className='m-[5rem] '>

        <div className='bg-teal-400  p-[20px] text-center text-[1.5rem]'>
          
         <input
            type="password"
            placeholder=" Enter password"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
         />
          {result && (
          <div>
            <div><div>
                {(result.score === 0?
                <p> 
                  <div className='text-slate-300 text-center  text-[100px]'>
                    ----
                  </div>
                </p>:
                <p></p>
                )}
              {(result.score <= 1 && result.score > 0?
                <div><p className='flex place-content-center text-slate-300 text-center text-[100px]'>
                  <p className='text-green-700'>-</p>
                  ---
                </p></div>:
                <p></p>
                )}
                {(result.score >1 && result.score <=2?
                <div><p className='flex place-content-center text-slate-300 text-[100px]'>
                  <p className='text-green-700'>--</p>
                  --
                </p></div>:
                <p></p>
                )}
                {(result.score <=3 && result.score > 2?
                <div><p className='flex place-content-center text-slate-300 text-[100px]'>
                <p className='text-green-700'>---</p>
                -
              </p></div>:
              <p></p>
                )}
                {(result.score === 4?
                <div><p className='flex place-content-center text-slate-300 text-[100px]'>
                <p className='text-green-700'>----</p>
                
              </p></div>:
              <p></p>
                )}
                </div></div>
              <div>
                  The percentage of security is {result.score/5 * 100}%
              </div>
              <div>
                  The score for security is ({result.score}/5)
              </div>
              <div>
              {(result.score === 0?
                <p className='text-red-700'>
                  password is weaker than the word weak
                  
                </p>:
                <p></p>
                )}
              {(result.score <= 1 && result.score > 0?
                <p className='text-red-400'>
                  password is weak
                  *
                </p>:
                <p></p>
                )}
                {(result.score >1 && result.score <=2?
                <p className='text-green-600'>
                  password is strong
                  **
                </p>:
                <p></p>
                )}
                {(result.score <=3 && result.score > 2?
                <p className='text-green-700'>
                  password is very strong
                  ***
                </p>:
                <p></p>
                )}
                {(result.score === 4?
                <p className='text-green-800'>
                  password is stonger than the word strong
                  ****
                </p>:
                <p></p>
                )}
                {(result.score ==4 && result.score >5?
                <p>
                  password is stonger than the word strong
                  ****
                </p>:
                <p></p>
                )}
                {Time&&(
                <div>
                  It will be cracked in: <strong>{Time}</strong>
                </div>)}
                <div>
                {(result.score === 0?
                <p className='text-red-400 text-right text-[100px]'>
                    
                  <div className='text-center text-[1.5rem]'>The password should contain uppercase characters, symbols, blank spaces and digits</div>
                </p>:
                <p></p>
                )}
              {(result.score <= 1 && result.score > 0?
                <p className='text-red-700 text-right text-[100px]'>
                  
                  <div className='text-center text-[1.5rem]'>The password should contain uppercase characters, symbols, blank spaces and digits</div>
                </p>:
                <p></p>
                )}
                {(result.score >1 && result.score <=2?
                <p className='text-green-600 text-right text-[100px]'>
                  
                  <div className='text-center text-[1.5rem]'>This can be improved</div>
                </p>:
                <p></p>
                )}
                {(result.score <=3 && result.score > 2?
                <p className='text-green-700 text-right text-[100px]'>
                  
                  <div className='text-center text-[1.5rem]'>Can you think of a more secure password ?</div>
                </p>:
                <p></p>
                )}
                {(result.score === 4?
                <p className='text-green-800 text-right text-[100px]'>
                  <div className='text-center text-[1.5rem]'>CONGRATULATIONS !! braniac you made the most secured password ever</div>
                </p>:
                <p></p>
                )}
                </div>
                </div>
              <div className='text-[40px] center'></div>
          </div>)}
          </div>
            </div>
      </main>
    </>
  )
};

export default HomePage;
