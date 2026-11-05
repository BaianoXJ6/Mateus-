export default function handler(req, res) {
    // A homenagem está liberada: não manter a tela de espera ativa.
    return res.status(200).json({
        liberado: true,
        html: `
            <header class="birthday-hero">
                <div class="hero-inner">
                    <p class="eyebrow">Finalmente chegou</p>
                    <h1>Feliz <em>18 anos,</em> <span>Mateus</span>.</h1>
                    <p class="hero-description">
                        Hoje começa uma fase nova. Fiz isso aqui para guardar
                        algumas coisas que eu queria te dizer nesse dia.
                    </p>
                </div>
            </header>

            <section class="section">
                <div class="section-container">
                    <div class="section-heading">
                        <span>01</span>
                        <h2>Algumas lembranças.</h2>
                    </div>

                    <article class="memory">
                        <span class="memory-number">01</span>
                        <div class="memory-content">
                            <p class="memory-label">Uma lembrança</p>
                            <h3>Momentos que ficam.</h3>
                            <p>Algumas fotos guardam mais do que um instante: trazem de volta as conversas, as risadas e tudo de bom que veio junto.</p>
                            <figure class="memory-photo">
                                <img src="/fotos/foto1.jpg" alt="Uma lembrança especial do Mateus" loading="lazy">
                            </figure>
                        </div>
                    </article>

                    <article class="memory">
                        <span class="memory-number">02</span>
                        <div class="memory-content">
                            <p class="memory-label">Mais um registro</p>
                            <h3>Do seu jeito.</h3>
                            <p>Que nunca faltem motivos para criar novas histórias e fotografias para lembrar delas.</p>
                            <figure class="memory-photo">
                                <img src="/fotos/foto2.jpg" alt="Mais uma lembrança especial do Mateus" loading="lazy">
                            </figure>
                        </div>
                    </article>
                </div>
            </section>

            <section class="section">
                <div class="section-container">
                    <div class="section-heading">
                        <span>02</span>
                        <h2>Um novo capítulo.</h2>
                    </div>
                    <div class="facts">
                        <article><span>18</span><p>Um monte de histórias vividas.</p></article>
                        <article><span>+</span><p>Um mundo inteiro de possibilidades pela frente.</p></article>
                        <article><span>∞</span><p>E muitos bons momentos ainda para chegar.</p></article>
                    </div>
                </div>
            </section>

            <section class="section letter-section">
                <div class="letter">
                    <span class="letter-number">03</span>
                    <p class="letter-small">Uma mensagem para hoje</p>
                    <h2>Feliz aniversário, Matuto!</h2>
                    <p>Mateus, ou melhor, Matuto kkkkk! Mano, muito obrigado mesmo por tudo que você fez por mim, irmão! Por cada risada, cada momento e cada ensinamento. Agradeço muito por ter você como amigo.</p>
                    <p>Sinceramente, desde o primeiro dia, quando você estava corcunda kkkkk e gritando que nem o Justin Bieber! Foi assim que surgiu meu primeiro apelido para você, e, depois disso, só vieram momentos de alegria.</p>
                    <p>Mais uma vez, obrigado por tudo, irmão. Que a nossa amizade tenha um futuro muito longo e que a gente cresça junto. Te amo! 💗</p>
                </div>
            </section>

            <section class="section final-section">
                <div class="section-container">
                    <p class="eyebrow">E ainda tem mais</p>
                    <h2>Pronto para abrir a surpresa?</h2>
                    <button class="surprise-button" id="surpriseBtn" type="button">Abrir surpresa</button>
                    <div class="surprise-box" id="surpriseBox" hidden>
                        <span class="surprise-emoji" aria-hidden="true">🎂</span>
                        <h3>Que seu dia seja inesquecível!</h3>
                        <p>Feliz 18 anos, Mateus! Que essa nova etapa traga muita alegria, realizações e histórias boas para contar. Parabéns!</p>
                    </div>
                </div>
            </section>

            <footer>Feito com carinho para celebrar os 18 anos do Mateus.</footer>
        `
    });
}
