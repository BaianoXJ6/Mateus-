export default function handler(req, res) {

    // 05/10/2026 00:00 no horário UTC-3
    // = 05/10/2026 03:00 UTC

    const liberacao = Date.UTC(
        2026,
        9,
        5,
        3,
        0,
        0
    );

    const agora = Date.now();


    // Ainda não chegou meia-noite
    if (agora < liberacao) {

        return res.status(403).json({
            liberado: false,
            mensagem: "Ainda não chegou a hora 👀"
        });

    }


    // Depois da meia-noite
    return res.status(200).json({

        liberado: true,

        html: `
            <header class="birthday-hero">

                <div class="hero-inner">

                    <p class="eyebrow">
                        finalmente chegou
                    </p>

                    <h1>
                        Feliz
                        <em>18 anos,</em>
                        <span>Mateus</span>.
                    </h1>

                    <p class="hero-description">
                        Hoje começa uma fase nova.
                        Fiz isso aqui para guardar algumas coisas
                        que eu queria te dizer nesse dia.
                    </p>

                </div>

            </header>


            <section class="section">

                <div class="section-container">

                    <div class="section-heading">
                        <span>01</span>

                        <h2>
                            Algumas lembranças.
                        </h2>
                    </div>

                    <!-- RESTO DO SEU SITE AQUI -->

                </div>

            </section>
        `
    });

}