document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // CONFIGURAÇÕES
  // ==========================================

  const NOME = "Mateus";

  /*
    05/10/2026 às 00:00 no horário de Brasília (-03:00)

    00:00 no Brasil = 03:00 UTC.

    Usando Date.UTC evitamos problemas de navegador
    interpretar a data de maneira diferente.
  */
  const DATA_ANIVERSARIO = Date.UTC(
    2026, // ano
    9,    // outubro (janeiro = 0)
    5,    // dia
    3,    // 03:00 UTC = 00:00 no Brasil
    0,
    0
  );


  // ==========================================
  // NOME
  // ==========================================

  document
    .querySelectorAll("[data-name]")
    .forEach(elemento => {

      elemento.textContent = NOME;

    });


  // ==========================================
  // ELEMENTOS DA CONTAGEM
  // ==========================================

  const daysElement =
    document.getElementById("days");

  const hoursElement =
    document.getElementById("hours");

  const minutesElement =
    document.getElementById("minutes");

  const secondsElement =
    document.getElementById("seconds");

  const waitingScreen =
    document.getElementById("waitingScreen");

  const birthdayContent =
    document.getElementById("birthdayContent");


  // Verifica se os elementos existem
  if (
    !daysElement ||
    !hoursElement ||
    !minutesElement ||
    !secondsElement
  ) {

    console.error(
      "Erro: não encontrei os elementos da contagem no HTML."
    );

    return;

  }


  // ==========================================
  // DOIS DÍGITOS
  // ==========================================

  function formatar(numero) {

    return String(numero)
      .padStart(2, "0");

  }


  // ==========================================
  // LIBERAR CONTEÚDO
  // ==========================================

  let siteLiberado = false;

  function liberarSite() {

    if (siteLiberado) {
      return;
    }

    siteLiberado = true;


    if (waitingScreen) {

      waitingScreen.hidden = true;

    }


    if (birthdayContent) {

      birthdayContent.hidden = false;

    }


    criarConfetes(130);

  }


  // ==========================================
  // CONTAGEM REGRESSIVA
  // ==========================================

  function atualizarContagem() {

    const agora = Date.now();

    const diferenca =
      DATA_ANIVERSARIO - agora;


    // CHEGOU O ANIVERSÁRIO
    if (diferenca <= 0) {

      daysElement.textContent = "00";

      hoursElement.textContent = "00";

      minutesElement.textContent = "00";

      secondsElement.textContent = "00";


      liberarSite();

      return;

    }


    // ==========================================
    // CONVERSÕES
    // ==========================================

    const segundosTotais =
      Math.floor(
        diferenca / 1000
      );


    const dias =
      Math.floor(
        segundosTotais / 86400
      );


    const horas =
      Math.floor(
        (segundosTotais % 86400)
        / 3600
      );


    const minutos =
      Math.floor(
        (segundosTotais % 3600)
        / 60
      );


    const segundos =
      segundosTotais % 60;


    // ==========================================
    // MOSTRAR NA TELA
    // ==========================================

    daysElement.textContent =
      formatar(dias);

    hoursElement.textContent =
      formatar(horas);

    minutesElement.textContent =
      formatar(minutos);

    secondsElement.textContent =
      formatar(segundos);

  }


  // Atualiza assim que abrir a página
  atualizarContagem();


  // Atualiza várias vezes por segundo
  setInterval(
    atualizarContagem,
    250
  );


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
        document.createElement("span");


      confete.className =
        "confetti";


      confete.style.left =
        Math.random() * 100
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
          + Math.random() * 3
        )

        + "s";


      document.body
        .appendChild(confete);


      setTimeout(() => {

        confete.remove();

      }, 7000);

    }

  }


  // ==========================================
  // BOTÃO DA SURPRESA
  // ==========================================

  const surpriseButton =
    document.getElementById(
      "surpriseBtn"
    );

  const surpriseBox =
    document.getElementById(
      "surpriseBox"
    );


  // Só adiciona o evento se o botão existir.
  // Assim ele NÃO quebra a contagem se você
  // decidir remover a surpresa do HTML.

  if (
    surpriseButton &&
    surpriseBox
  ) {

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
  // TESTE NO CONSOLE
  // ==========================================

  console.log(
    "Contagem carregada corretamente ✅"
  );

  console.log(
    "Agora:",
    new Date()
  );

  console.log(
    "Libera em:",
    new Date(DATA_ANIVERSARIO)
  );

});