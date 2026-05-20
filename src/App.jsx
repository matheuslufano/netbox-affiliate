import "./App.css";

import logo from "../public/LOGO-NETBOX.png"; // sua logo aqui
import ubook from "../public/imgs/ubook.jpg";
import deezer from "../public/imgs/deezer-black.png";
import sky from "../public/imgs/sky-plus.png";
import prime from "../public/imgs/prime-video.png";
import disney from "../public/imgs/disney-plus.png";

import capas from "../public/logos/image.png"; // logos dos apps aqui 
import { IoAdd, IoLogoWhatsapp } from "react-icons/io5";
export default function App() {
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
  const whatsappNumber = String(
    import.meta.env.VITE_WHATSAPP_NUMBER || ""
  ).replace(/\D/g, "");
  const whatsappFallbackUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=Tenho%20interesse%20no%20Plano%20Familia%20Netbox.`
    : "";

  function getReferralCode() {
    const params = new URLSearchParams(window.location.search);
    const code =
      params.get("ref") ||
      params.get("shortCode") ||
      params.get("link");

    if (code) {
      sessionStorage.setItem("netboxReferralCode", code);
      return code;
    }

    return sessionStorage.getItem("netboxReferralCode");
  }

  function handleWhatsappClick() {
    const referralCode = getReferralCode();

    if (!referralCode) {
      if (!whatsappFallbackUrl) {
        alert("Link de divulgação não identificado.");
        return;
      }

      window.location.href = whatsappFallbackUrl;
      return;
    }

    const url = new URL(
      `/links/${referralCode}/whatsapp`,
      apiBaseUrl
    );
    url.searchParams.set("product", "Plano Familia Netbox");

    window.location.href = url.toString();
  }

  return (
    <div>

      {/* HEADER */}
      <header className="header">
        <img src={logo} alt="Netbox" className="logo" />
        <div className="divider"></div>
        <h2 className="tagline">
          amizade que <strong>conecta</strong>
        </h2>
      </header>

      {/* FAIXA */}
      <div className="top-bar">
        SITE EXCLUSIVO PARA VENDAS <strong>NETBOX INTERNET</strong>
      </div>

      {/* HERO - seção do titulo */}
      <section className="hero">
        <h1>
          Quer internet para sua <br />
          casa com benefícios que <br />
          geram economia de verdade?
        </h1>

        <button className="cta">
          QUERO CONHECER O PLANO
        </button>
      </section>

      {/* SEÇÃO - 1 POR QUE ESCOLHER */}
      <section className="why">
        <h2>Por que escolher a Netbox Internet?</h2>

        <p>
          Somos um provedor que se importa com você. Te entregamos
          a velocidade contratada com estabilidade e velocidade.
          Nosso time de atendimento se importa com você. Aqui é gente
          atendendo gente, todos os dias da semana! Aqui garantimos o que prometemos.
        </p>
      </section>

      {/* SEÇÃO - 2 PLANO + COMPARAÇÃO */}
      <section className="plan">

        <h2 className="plan-title">CONTRATE O PLANO FAMÍLIA</h2>

        <div className="plan-content">

          {/* TEXTO */}
          <div className="plan-left">
            <p className="paragrafo">
              Alta velocidade para navegação, streaming de vídeo e música
              e trabalhos pesados.
            </p>

            <h4>ASSINATURA INCLUSA</h4>
            {/* LINHA COM LOGO */}
            <div className="logo-line">
              <span className="line"></span>

              <div className="logo-item">
                <img src={ubook} alt="Logo ubook" className="logo-line-image" />
                <span className="subtitle">Ubook</span>
              </div>

              <div className="logo-item">
                <img src={deezer} alt="Logo deezer" className="logo-line-image" />
                <span className="subtitle">Deezer</span>
              </div>

              <div className="logo-item">
                <img src={sky} alt="Logo sky" className="logo-line-image" />
                <span className="subtitle">Sky</span>
              </div>

              <div className="logo-item">
                <img src={prime} alt="Logo prime" className="logo-line-image" />
                <span className="subtitle">Prime</span>
              </div>

              {/* <div className="logo-item">
                <img src={disney} alt="Logo disney" className="logo-line-image" />
                <span className="subtitle">Disney+</span>
              </div> */}

              <span className="line"></span>

            </div>
            <div className="logo-line">
              
            <div className="logo-item-bonos">
                  <IoAdd 
                    size={40} 
                    color="red"
                    style={{
                      color: "red",
                      filter: "drop-shadow(0 0 3px red)"
                    }}
                    />
              <div className="logo-item">
                  <img src={disney} alt="Logo disney" className="logo-line-image" />
              </div>
              <p>BÔNUS DE 3 MESES DE DISNEY+ SEM CUSTO ADICIONAL.</p>
              </div>
            </div>
            

          </div>

          {/* BENEFÍCIOS */}
          <div className="plan-right">
            <ul>
              <li> <IoAdd /> 700 MEGAS</li>
              <li> <IoAdd /> ROTEADOR EM COMODATO</li>
              <li> <IoAdd /> SUPORTE PREMIUM</li>
              <li> <IoAdd /> INSTALAÇÃO PRIORITÁRIA</li>
            </ul>
          </div>

        </div>

        {/* COMPARAÇÃO */}
        <h2 className="compare-title">COMPARE</h2>

        <div className="compare">

          <div className="compare-left">
            <h4>CONTRATANDO AVULSO</h4>
            <ul className="price-list">
              <li>
                <span>700 MEGA</span>
                <span>R$ 120,00</span>
              </li>
              <li>
                <span>UBOOK GO</span>
                <span>R$ 9,90</span>
              </li>
              <li>
                <span>DEEZER</span>
                <span>R$ 24,90</span>
              </li>
              <li>
                <span>SKY+</span>
                <span>R$ 12,90</span>
              </li>
              <li>
                <span>PRIME VIDEO</span>
                <span>R$ 22,90</span>
              </li>
              <li>
                <span>DISNEY+</span>
                <span>R$ 46,90</span>
              </li>
            </ul>

            <strong className="total">TOTAL: R$ 237,50</strong>
          </div>

          <div className="compare-right">
            <h4>PLANO FAMÍLIA NETBOX</h4>

            <ul className="lista-plonos">
              <li> <IoAdd /> 700 MEGAS</li>
              <li> <IoAdd /> ROTEADOR EM COMODATO</li>
              <li> <IoAdd /> SUPORTE PREMIUM</li>
              <li> <IoAdd /> INSTALAÇÃO PRIORITÁRIA</li>
            </ul>

            <div className="price-box">
              <span>Aproveite essa oferta!</span>
              <h3>R$ 134,90/mês</h3>

              <button onClick={handleWhatsappClick}>ASSINAR PELO WHATSAPP</button>
            </div>
          </div>

        </div>

      </section>

      {/* SEÇÃO - 3 STREAMING / BENEFÍCIOS */}
      <section className="streaming">
        <h2>
          Seu mundo com as melhores <br />
          séries e filmes pra maratonar, as <br />
          suas músicas favoritas e <br />
          audiolivros exclusivos!
        </h2>

        <div className="streaming-images">
          <img src={capas} alt="apps" />
        </div>
      </section>

      {/* SEÇÃO FINAL - OFERTA */}
      <section className="final-offer">

        <div className="final-offer-content">
          <div className="final-offer-copy">
            <span className="offer-kicker">Plano Família Netbox</span>

            <h2 className="final-title">
              QUEM COMPARA,<br />ASSINA NETBOX!
            </h2>

            <p className="final-description">
              Internet de verdade, apps inclusos e suporte premium em uma oferta
              simples para sua casa ficar sempre conectada.
            </p>

        <div className="ideal">
          <p>Esse plano é ideal para quem:</p>
          <div className="lista-ideal">
            <ul>
              <li>Assiste TV e streaming com frequência</li>
              <li>Trabalha ou estuda em casa</li>
              <li>Usa vários dispositivos ao mesmo tempo</li>
              <li>Quer mais estabilidade no dia a dia</li>
              <li>Quer mais benefícios sem pagar separado por isso</li>
              <li>Valoriza praticidade e suporte</li>
            </ul>
          </div>
        </div>

          </div>

        <div className="price-highlight">
            <span>APROVEITE AGORA ESSA OFERTA!</span>

            <h1>
              R$ 134,90 <small>/mês</small>
            </h1>

            <p>POR 12 MESES NO BOLETO BANCÁRIO</p>

            <div className="offer-savings">
              Economia de mais de R$ 100,00 comparado aos serviços avulsos.
            </div>

            <button className="cta" onClick={handleWhatsappClick}>
              <IoLogoWhatsapp /> ASSINAR PELO WHATSAPP
            </button>
          </div>
        </div>

      </section>
  </div>
  );
}
