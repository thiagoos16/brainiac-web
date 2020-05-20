import React, { useState }  from  'react';

import './styles.css';

import api from '../../services/api';

export default function Form() {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ isDisabled, disableButton ] = useState(true);

    async function handleEnableLink(e) {
        e.preventDefault();

        const data = {
          name,
          email
        }
    
        try {
          await api.post('downloaders', data, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        } catch (error) {
          alert('Erro no cadastro');
        }
    }

    function verifyFieldsFill() {
      if (name != '' && email != '') {
        disableButton(false);
      }
    } 

    return (
        <div className="downloader-container">
          <div className="content">
            <section>
              <h1> Preencha os dados para baixar os arquivos </h1>
            </section>
  
            <form onSubmit={handleEnableLink}>
                <input
                    placeholder="Informe seu nome"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onKeyUp={verifyFieldsFill}
                />

                <input
                    placeholder="Informe seu email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyUp={verifyFieldsFill}
                />
 
                <button className="button" type="submit" disabled={isDisabled}> Baixar PDFs </button>
            </form>
          </div>
        </div>
    );
}