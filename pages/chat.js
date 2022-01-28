import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { useState, useEffect } from 'react';
import appConfig from '../config.json';
import { MdDeleteOutline } from 'react-icons/md'
import { createClient } from '@supabase/supabase-js'
import loadingImg from './components/loading'




//banco de dados 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMyMjk4NiwiZXhwIjoxOTU4ODk4OTg2fQ.GzjrhksATuf7869WWxnYGHiK-kjGehGdyzYJhvRA38k'
const SUPABASE_URL = 'https://cjhtfsaiuntftwrezjqc.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


export default function ChatPage() {
    // Sua lógica vai aqui
    const [mensagem, setMensagem] = useState('');
    const [listaDeMensagens, setListaDeMensagens] = useState([]);

    //usa os dados do servidor
    useEffect(() => {
       
        const dadosDoSupabase = supabaseClient
            .from('mensagem')
            .select('*')
            .order('id', {ascending: false})
            .then(( {data}) => {
                console.log('dados da consulta', data);
                setListaDeMensagens(data)
            
            })
    }, []);

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            de: 'rafavini',
            texto: novaMensagem,

        }
        supabaseClient
            .from('mensagem')
            .insert([
                mensagem
            ])
            .then(({data}) => {
                console.log('criando mensagem: ', data);
                setListaDeMensagens([
                    data[0],
                    ...listaDeMensagens
                ])
            })
        setMensagem('');


      
    }


    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a44d0206-0e67-40ce-9420-e9b21ed021fa/db7z5vb-d52d226d-f984-4345-bb1e-e30fb8de9717.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2E0NGQwMjA2LTBlNjctNDBjZS05NDIwLWU5YjIxZWQwMjFmYVwvZGI3ejV2Yi1kNTJkMjI2ZC1mOTg0LTQzNDUtYmIxZS1lMzBmYjhkZTk3MTcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.wDMNsS31-BWiVrqhr8lJMl-Rky8_f2OvLUOFV4DOhqM)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >

            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 100%)',
                    borderRadius: '50px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '30%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    {listaDeMensagens < 1 ? loadingImg(): <MessageList mensagens={listaDeMensagens} setListaDeMensagens={setListaDeMensagens} /> }
                    

                    <Box
                        
                        as="form"
                        styleSheet={{
                        
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >

                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                            
                                setMensagem(event.target.value)
                                
                                
                            }}

                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}

                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                            type='button'
                            label='Enviar'

                            onClick={(e) => {
                                if (mensagem != '') {
                                    e.preventDefault()
                                    handleNovaMensagem(mensagem)
                                }
                            }}

                            styleSheet={{
                                borderRadius: '5px',
                                padding: '13px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                marginBottom: '7px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}

                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Master Duel Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}



function MessageList(props) {
    //console.log('MessageList', props);


    //funcão que deleta as mensagem da tela
    function deleteMensagem(mensagemID) {
        // para cada elemento do vetor ele verifica se o id do que eu cliquei é diferente dos que estão no vetor
        // em caso de positivo ele gera um novo vetor newListaMensagem com os valores diferente do id que eu cliquei


        //deletando a mensagem do servidor
        supabaseClient
            .from('mensagem')
            .delete()
            .match({id: mensagemID})
            .then((response) => {
                console.log('deletei essa mensagem:',response)
            })
            
        //deletando a mensagem na tela    
        let newListaMensagem = props.mensagens.filter((item) => {
            if (item.id != mensagemID) {
                return item
            }
        })

        props.setListaDeMensagens([
            ...newListaMensagem
        ])

    }

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                console.log(mensagem);
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '-10px',
                            }}
                        >

                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',


                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {'@'+mensagem.de}
                            </Text>

                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>

                            <Button
                                type='button'
                                label={<MdDeleteOutline />}
                                onClick={(() => {
                                    deleteMensagem(mensagem.id)

                                })}
                                styleSheet={{
                                    height: '10px',
                                    width: '20px',
                                    marginLeft: '95%',
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                    hover: {
                                        backgroundColor: appConfig.theme.colors.neutrals[999],
                                    }
                                }}

                            />

                        </Box>
                        {mensagem.texto}
                    </Text>
                )
            })}


        </Box>
    )
}