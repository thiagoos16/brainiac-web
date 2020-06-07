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
          await api.post('api/downloaders', data, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          alert('Acesse a nova aba e baixe os PDFs');
          window.open("https://drive.google.com/file/d/10uSeGgcSkPNvVXnAP74Tpu0moCan2QCq/view");
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
          <section className="content">
            <form onSubmit={handleEnableLink}>
                <h1> Preencha e baixe os PDFs </h1>

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
          </section>
        </div>
    );
}