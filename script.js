document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // CONFIGURAÇÕES
    // ==========================================

    const NOME = "Mateus";


    /*
        05/10/2026 às 00:00
        horário de Brasília / Pernambuco (-03:00)

        00:00 UTC-3 = 03:00 UTC
    */

    const DATA_ANIVERSARIO = Date.UTC(
        2026,
        9,
        5,
        3,
        0,
        0
    );



    // ==========================================
    // ELEMENTOS
    // ==========================================

    const waitingScreen =
        document.getElementById(
            "waitingScreen"
        );


    const birthdayContent =
        document.getElementById(
            "birthdayContent"
        );


    const daysElement =
        document.getElementById(
            "days"
        );


    const hoursElement =
        document.getElementById(
            "hours"
        );


    const minutesElement =
        document.getElementById(
            "minutes"
        );


    const secondsElement =
        document.getElementById(
            "seconds"
        );



    // ==========================================
    // VERIFICAÇÃO
    // ==========================================

    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {

        console.error(
            "Não encontrei os elementos da contagem."
        );

        return;

    }



    // ==========================================
    // FORMATAÇÃO
    // ==========================================

    function formatar(numero) {

        return String(numero)
            .padStart(2, "0");

    }



    // ==========================================
    // NOME
    // ==========================================

    function aplicarNome() {

        document
            .querySelectorAll(
                "[data-name]"
            )
            .forEach(elemento => {

                elemento.textContent =
                    NOME;

            });

    }



    // ==========================================
    // CONTROLE DE CARREGAMENTO
    // ==========================================

    let siteLiberado = false;

    let carregandoConteudo = false;



    // ==========================================
    // BUSCAR CONTEÚDO DA VERCEL
    // ==========================================

    async function liberarSite() {

        if (
            siteLiberado ||
            carregandoConteudo
        ) {

            return;

        }


        carregandoConteudo = true;


        try {

            /*
                O conteúdo secreto vem daqui.

                Antes da meia-noite,
                o servidor deve responder 403.

                Depois da meia-noite,
                ele devolve o HTML.
            */

            const resposta =
                await fetch(
                    "/api/conteudo",
                    {
                        method: "GET",

                        cache:
                            "no-store"
                    }
                );


            // Ainda não foi liberado
            if (!resposta.ok) {

                carregandoConteudo =
                    false;

                console.log(
                    "Conteúdo ainda bloqueado."
                );

                return;

            }


            const dados =
                await resposta.json();



            // Resposta inválida
            if (
                !dados.liberado ||
                !dados.html
            ) {

                carregandoConteudo =
                    false;

                return;

            }



            // ==================================
            // COLOCAR HOMENAGEM NA PÁGINA
            // ==================================

            birthdayContent.innerHTML =
                dados.html;



            // Coloca Mateus em todos os data-name
            aplicarNome();



            // ==================================
            // MOSTRAR SITE
            // ==================================

            birthdayContent.hidden =
                false;


            waitingScreen.hidden =
                true;


            siteLiberado =
                true;


            carregandoConteudo =
                false;



            // Voltar para o topo
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
            });



            // Ativar botão surpresa
            configurarSurpresa();



            // Confetes
            criarConfetes(130);

        }

        catch (erro) {

            carregandoConteudo =
                false;


            console.error(
                "Erro ao carregar a homenagem:",
                erro
            );

        }

    }



    // ==========================================
    // CONTAGEM REGRESSIVA
    // ==========================================

    function atualizarContagem() {

        const agora =
            Date.now();


        const diferenca =
            DATA_ANIVERSARIO
            - agora;



        // ==================================
        // CHEGOU A HORA
        // ==================================

        if (diferenca <= 0) {

            daysElement.textContent =
                "00";

            hoursElement.textContent =
                "00";

            minutesElement.textContent =
                "00";

            secondsElement.textContent =
                "00";


            liberarSite();


            return;

        }



        // ==================================
        // CALCULAR TEMPO
        // ==================================

        const segundosTotais =
            Math.floor(
                diferenca / 1000
            );


        const dias =
            Math.floor(
                segundosTotais
                / 86400
            );


        const horas =
            Math.floor(

                (
                    segundosTotais
                    % 86400
                )

                / 3600
            );


        const minutos =
            Math.floor(

                (
                    segundosTotais
                    % 3600
                )

                / 60
            );


        const segundos =
            segundosTotais
            % 60;



        // ==================================
        // MOSTRAR
        // ==================================

        daysElement.textContent =
            formatar(dias);


        hoursElement.textContent =
            formatar(horas);


        minutesElement.textContent =
            formatar(minutos);


        secondsElement.textContent =
            formatar(segundos);

    }



    // ==========================================
    // CONFETES
    // ==========================================

    function criarConfetes(
        quantidade = 100
    ) {

        const cores = [

            "#ff6846",

            "#f3f0e9",

            "#e8bd57",

            "#cf5d45"

        ];


        for (
            let i = 0;
            i < quantidade;
            i++
        ) {

            const confete =
                document.createElement(
                    "span"
                );


            confete.className =
                "confetti";


            confete.style.left =

                Math.random()
                * 100
                + "vw";


            confete.style.backgroundColor =

                cores[
                    Math.floor(

                        Math.random()
                        * cores.length

                    )
                ];



            confete.style.setProperty(

                "--move",

                (
                    Math.random()
                    * 220
                    - 110
                )

                + "px"

            );



            confete.style.setProperty(

                "--rotate",

                (
                    Math.random()
                    * 720
                )

                + "deg"

            );



            confete.style.animationDuration =

                (
                    3
                    + Math.random()
                    * 3
                )

                + "s";



            confete.style.animationDelay =

                (
                    Math.random()
                    * 0.5
                )

                + "s";



            document.body
                .appendChild(
                    confete
                );



            setTimeout(
                () => {

                    confete.remove();

                },

                7000
            );

        }

    }



    // ==========================================
    // BOTÃO SURPRESA
    // ==========================================

    function configurarSurpresa() {

        /*
            IMPORTANTE:

            O botão só existe depois
            que o HTML chega da API.

            Por isso procuramos ele AQUI,
            depois de carregar o conteúdo.
        */

        const surpriseButton =
            document.getElementById(
                "surpriseBtn"
            );


        const surpriseBox =
            document.getElementById(
                "surpriseBox"
            );


        if (
            !surpriseButton ||
            !surpriseBox
        ) {

            return;

        }



        surpriseButton
            .addEventListener(
                "click",
                () => {


                    surpriseBox.hidden =
                        false;


                    surpriseButton.hidden =
                        true;


                    criarConfetes(70);

                }
            );

    }



    // ==========================================
    // INICIAR
    // ==========================================

    atualizarContagem();


    /*
        250ms faz a mudança acontecer
        praticamente no instante
        em que bater meia-noite.
    */

    setInterval(
        atualizarContagem,
        250
    );



    console.log(
        "Contagem carregada ✅"
    );


    console.log(
        "Data de liberação:",
        new Date(
            DATA_ANIVERSARIO
        )
    );

});