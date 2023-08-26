import { useEffect, useState } from "react";
import "./style.css"
import CardServicos from "../../components/CardServicos";
import api from "../../utils/api";

export default function ListaServicos() {

    const [servicos, setServicos] = useState<any[]>([]);

    const [skillDigitada, setSkillDigitada] = useState<string>("");

    const [listaServicosFiltrados, setListaServicosFiltrados] = useState<any[]>(servicos);

    useEffect(() => {
        document.title = "Lista de Devs - VSConnect"

        listarServicos()
    }, [])

    function buscarPorSkill(event: any) {
        event.preventDefault();

        const servicosFiltrados = servicos.filter((servico: any) => servico.techs.includes(skillDigitada.toLocaleUpperCase()));

        if (servicosFiltrados.length === 0) {
            alert("Nenhum desenvolvedor(a) com essa skill")
        } else {
            setListaServicosFiltrados(servicosFiltrados)
        }
    }

    function retornoServicosGeral(event: any) {
        if (event.target.value === "") {
            setListaServicosFiltrados(servicos)
        }
        setSkillDigitada(event.target.value)
    }

    function listarServicos() {

        api.get("servicos").then((response: any) => {
            console.log(response.data)
            setServicos(response.data)
        })

    }



    return (
        <main id="lista-servicos">
            <div className="container container_lista_servicos">
                <div className="lista_servicos_conteudo">
                    <h1>Lista de Serviços</h1>
                    <hr />
                    <form method="post" onSubmit={buscarPorSkill}>
                        <div className="wrapper_form">
                            <label htmlFor="busca">Procurar serviços</label>
                            <div className="campo-label">
                                <input type="search" name="campo-busca" id="busca" placeholder="Buscar serviços por tecnologias..." onChange={retornoServicosGeral} />
                                <button type="submit">Buscar</button>
                            </div>
                        </div>
                    </form>
                    <div className="wrapper_lista">
                        <ul>
                            {
                                listaServicosFiltrados.length === 0 ?

                                    servicos.map((servicos: any, index: number) => {
                                        return <li key={index}>
                                            <CardServicos
                                                titulo={servicos.titulo}
                                                descricao={servicos.descricao}
                                                valor={servicos.valor}
                                                techs={servicos.techs}
                                            />
                                        </li>
                                    }
                                    ) : listaServicosFiltrados.map((servicos: any, index: number) => {
                                        return <li key={index}>
                                            <CardServicos
                                                titulo={servicos.titulo}
                                                descricao={servicos.descricao}
                                                valor={servicos.valor}
                                                techs={servicos.techs}
                                            />
                                        </li>
                                    }
                                    )
                            }

                        </ul>
                    </div>
                </div>
            </div>
        </main>
    )
}