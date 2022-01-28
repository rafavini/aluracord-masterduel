import appConfig from '../config.json'
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { SiGithub } from 'react-icons/si';
import { useState} from 'react';
import { useRouter } from 'next/router';


function Titulo(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
              ${Tag} {
                  color: ${appConfig.theme.colors.neutrals['000']};
                  font-size: 24px;
                  font-weight: 600;
              }
              `}</style>
        </>
    );
}

function Background_video(props) {
    return (
        <>
            <video autoPlay muted loop >
                <source src={props.url} type='video/mp4' />
            </video>
            <audio autoPlay>
                <source src='/yugihoSong.mp3' type="audio/mpeg"/>
            </audio>

            <style jsx>{`
				video {
					position: absolute;
					z-index: -100;
					width: 100vw;
					height: 100vh;
					object-fit: fill;
				}
			`}</style>

        </>
    );
}




export default function PaginaInicial() {
    const [username, setUsername] = useState('rafavini') // setando o valor inicial da variável username como rafavini
    const roteamento = useRouter();
    const [userLocation, setUserLocation] = useState(`Campo Grande, Brazil `) // setando a localização inicial do usuário vazia.

    

    return (
        <>
            <Background_video url='https://giant.gfycat.com/KnobbyFlakyGeese.mp4'
            />
            <Box

                styleSheet={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >

                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '600px',
                        borderRadius: '50px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb( 0 0 / 100%)',
                        backgroundColor: 'rgba(0,0,0,0.8)',
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (event) {
                            event.preventDefault(); // parar de ficar recarregando a página quando clicar no botão
                            roteamento.push('/chat');//  usando o rout do next para fazer a paginação
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo tag="h2">Boas vindas Duelistas</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>

                        <TextField

                            //função que captura o que o usuario digitou no campo de texto, e atualiza a variável username com a função setUsername
                            onChange={function (event) {
                                const valor = event.target.value


                                
                                if (valor.length > 2) {// verifica se o valor digitado no campo do texto é maior que 2 para fazer a troca da variável username
                                    setUsername(valor)
                                    fetch(`https://api.github.com/users/${valor}`) //coleta os dados do github
                                        .then (response =>  response.json())
                                        .then(data => {
                                            setUserLocation(data.location) // seta a variavel userLocation com a location do usuário
                                        })
                                       
                                } else {
                                    setUsername('rafavini')
                                    setUserLocation('Campo Grande, Brazil')
                                }


                            }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',                   
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={username.length > 2 ? `https://github.com/${username}.png`: `https://github.com/rafavini.png` }
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                           <SiGithub/>&nbsp;{username}
                        </Text>

                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                            
                        >
                           {userLocation}
                        </Text>

                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}