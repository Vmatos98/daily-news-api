# Resumo

Servidor back-end para 
aquisição e ordenação de noticias, onde é possivel selecionar os temas prediletos e receber diariamente uma nova noticia sobre.

É possivel votar em noticias quentes ou frias, as mais bem avaliadas aparecem no top.

 Feita em Node.js, usando Express.js.


`requestNewsService.ts` é o arquivo que contém as funções que requisitam as noticias.

`server.ts` é o arquivo principal, que gerencia as rotas.

# Instalação

## Dependências

  Para esse projeto foi utilizada a API externa Newscatcher. É necessário informar sua key no arquivo `.env` Siga o exemplo contido em `.env.exemple` de como preencher esse dados.<br/>

  Link para a API: 
      https://rapidapi.com/newscatcher-api-newscatcher-api-default/api/newscatcher

    npm
    postgresql


No diretório do projeto, digite:

    npm i

## Execução
`Para execução rode os comandos no diretortio da aplicação`

Migrar banco de dados do prisma

    npx prisma migrate dev

Gerar tipos:

    npx prisma generate

Para modo develop:

    npm run dev

# Exemplos de uso
Alguns exemplos de uso da API.

## Cadastro


## Login
O login retorna dados da conta e o token que deve ser armazenado no front e retornado no header das requisições 



### Request
`Post /login` <br/>
Rota:

    localhost:5000/login 

Body:

    {
      "email":"user@mail.com",
      "password":"senhaforte"
    }

### Response
```json
{
  "user": {
    "id": 1,
    "name": "admin",
    "email": "user@mail.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2Mzc4NTU5OCwiZXhwIjoxNjYzODI4Nzk4fQ.wTGfhQOQklUrd5lE25W8r9qUzdDvYD25aBja1FMC7D4"
}
```

## Obter categorias
### Request
`Get /categories` <br/>

Rota:

    localhost:5000/categories 

Header:

    Bearer <Token>

### Response
<details>
<summary> Ver response longo</summary>
<p>

    [
      {
        "id": 37,
        "name": "anime"
      },
      {
        "id": 43,
        "name": "tecnologia"
      },
      {
        "id": 44,
        "name": "ciencias"
      },
      {
        "id": 45,
        "name": "filmes"
      },
      {
        "id": 46,
        "name": "finanças"
      },
      {
        "id": 47,
        "name": "games"
      },
      {
        "id": 48,
        "name": "moda"
      },
      {
        "id": 49,
        "name": "musica"
      },
      {
        "id": 50,
        "name": "noticias"
      },
      {
        "id": 51,
        "name": "saúde"
      },
      {
        "id": 52,
        "name": "politica"
      }
    ]
</p>
</details>
<br/>

## Obter categorias em que o usuário está inscrito
### Request
`Get /usercategories` <br/>

Rota:

    localhost:5000/usercategories 

Header:

    Bearer <Token>

### Response
<details>
<summary> Ver response longo</summary>
<p>

    [
      {
        "category": {
          "id": 37,
          "name": "anime"
        }
      },
      {
        "category": {
          "id": 45,
          "name": "filmes"
        }
      },
      {
        "category": {
          "id": 47,
          "name": "games"
        }
      },
      {
        "category": {
          "id": 51,
          "name": "saúde"
        }
      },
      {
        "category": {
          "id": 49,
          "name": "musica"
        }
      }
    ]
</p>
</details>
<br/>

## Adicionar ou remover categorias do usuário
As categorias a serem adicionadas ou removidas são enviadas em uma unica requisição, passando o id do ususario e o id da categoria <br/>
### Request

`Post /categories` <br/>

Rota:

    localhost:5000/categories 

Header:

    Bearer <Token>

Body:

    {
      "insert":[
        {      
          "userId":1,
          "categoryId":47
        },
        {      
          "userId":1,
          "categoryId":48
        },
        {      
          "userId":1,
          "categoryId":49
        }
        ],
      "remove":[
        {
          "userId":1,
          "categoryId":43
        }
        ]
    }

### Response

#### Tudo ok: 

    Status: 201 Created
    Size: 7 Bytes
    Time: 123 ms

#### Algum valor incorreto:

    Status: 400 Bad Request
    Size: 11 Bytes
    Time: 51 ms

## Buscar noticias 
A primeira busca pode demorar, pois os dados ainda não estão armazenados no banco de dados, após essa primeira consulta o resultado tende a ser mais rápido.<br/>
São retornadas dez noticias de cada categoria

### Request
`Get /news`

Rota:

    localhost:5000/news

Header:

    Bearer <Token>

### Response

<details>
<summary>exibir response muito longo</summary>
<p>

```json
    {
    "anime": [
      {
        "id": 238,
        "title": "A arte de se divertir com animes e mangás ruins",
        "description": "Nas últimas décadas a indústria dos animes foi capaz de criar histórias fascinantes e encantadoras… mas não todas. Os Cowboy Bebop e Fullmetal Alchemist Brotherhood que me perdoem, mas a maioria das produções feitas ano após ano no Japão são séries medianas e alguns animes péssimos. Não que isso seja um problema! O que acontece quando gostamos de um anime ruim? É algo que precisamos esconder das pessoas? Qual é a utilidade de um anime cujas qualidade estão lá no pré-sal? Com o lançamento (e a discussão) causada pela chegada de Bleach: Thousand-Year Blood War, talvez seja a hora de conversarmos sobre esse apreço que sentimos por histórias não tão boas assim. O retorno do Shinigami No último domingo (11) a internet foi surpreendida pelo trailer de Bleach: Thousand-Year Blood War, a mais nova série do ceifeiro de almas feita com o objetivo de adaptar todo o arco final da franquia, inédito em anime. A reação dos fãs, por motivos óbvios, foi muito positiva. Ichigo Kurosaki está mais estiloso do que nunca, com um character design respeitando toda a estética do autor Tite Kubo, e a própria animação se utiliza dos mais modernos recursos da computação gráfica para deixar aquela animação em 2D com carinha de longa-metragem. A celebração foi gigante, mas isso ofuscou um detalhe importante sobre essa estreia: por que Bleach está voltando só agora, 10 anos após o final do anime original? Se no começo dos anos 2000 Bleach era um dos pilares da revista Shonen Jump, uns dez anos depois a série se tornou aquela bicicleta ergométrica transformada em um cabide. O mangá ainda era sustentado por fãs empolgados com o desenrolar das aventuras dos shinigamis, mas eles foram minguando. Em meados de 2012 o estúdio Pierrot (o mesmo de Naruto) decidiu que não era mais interessante continuar com o anime, e encerrou a história por ali mesmo sem um final. O autor Tite Kubo até havia prometido (ou 'ameaçado', se preferir enxergar dessa forma) manter a história de Bleach por mais 10 anos na Shonen Jump, mas não conseguiu cumprir a meta. Ichigo e Rukia conseguiram ainda sentar muita porrada em inimigos em quadros estilosos sem cenário de fundo, mas o mangá acabou encerrado em 2016 após anos marcando presença cativa nas posições mais baixas da popularidade da Jump. Bleach acabou com 74 volumes encadernados. Esse período de 'ausência' fez bem para Bleach. Nesse intervalo de tempo a nostalgia e o valor sentimental fizeram seu trabalho e ele se tornou aquele amigo do passado com quem temos boas lembranças. Esse sentimento levou a novos projetos, como um longa-metragem com atores de carne e osso e um derivado chamado Burn the Witch (cuja ligação com a série original só foi revelada no final do capítulo piloto da história), mas mesmo assim é curiosa a decisão de animar o Thousand-Year Blood War, pois é como se os produtores estivessem esperando os fãs esquecerem o arco tão criticado para lançá-lo com uma animação bonita para \"disfarçar\" os buracos no roteiro. Mas enquanto alguns vibravam com as espadadas e os ângulos que teremos no anime, houve quem sentisse a necessidade de lembrar que o Thousand-Year Blood War é muito aquém de todo o resto do mangá. Com o anime logo aí virando a esquina, será mesmo um problema o fato desse arco final de Bleach ser péssimo? Animes e \"Guilty Pleasure\" Existe um termo em inglês criado para definir o apreço real por produções ruins. 'Guilty Pleasure' seria algo como um 'prazer com culpa', aquela coisa na qual conscientemente você sabe da qualidade ruim, mas de alguma forma você gosta daquilo. Qualquer coisa pode ser o seu guilty pleasure, seja uma música popular, uma novela mexicana dos anos 1990 ou um programa televisivo com famosos dublando outros artistas. Nosso gosto por um anime não é matemático, não vem de um combo certeiro de bela animação e excelente história, até porque o conjunto de elementos que torna um anime excelente é impossível de ser algo planejado. Somos atraídos pelas séries que mais gostamos por motivos subjetivos, seja pela identificação com um personagem ou mesmo reconhecer que tudo aquilo é ruim a ponto de conseguirmos levar para o lado do humor. Um anime com péssima animação, história e interpretação pode ser apreciado? Claro que sim! Ano passado escrevi aqui para o Omelete uma matéria sobre o anime EX-ARM, uma produção lançada pela Crunchyroll em janeiro de 2021. Essa série foi descrita como um acidente de carro, algo terrível e impossível de não olhar. Nada ali funcionou: as interpretações são risíveis, a história é repleta de decisões equivocadas de roteiro e a animação em 3D parece ter sido produzida pela equipe das propagandas do Dollynho. O fato de ainda ter sido dirigido por um profissional que nunca trabalhou com animes fez com que EX-ARM se tornasse o melhor anime de comédia da temporada, mesmo que de forma involuntária. Tudo era muito mambembe, mas também muito divertido. Mas não apenas animes terríveis como EX-ARM podem ser considerados guilty pleasures, esse é um caso extremo. Hoje temos a impressão de que somente animes muito bem animados como Jujutsu Kaisen ou Demon Slayer conquistam os fãs, mas às vezes algum anime mais 'desengonçado' consegue seu lugar ao sol. Orient e Tokyo Revengers são produções com qualidades técnicas bastante limitadas, mas que atraem os fãs pelo carisma dos personagens. Por outro lado, uma história bem recebida não é capaz de sozinha segurar uma produção mediana, como vimos em Record of Ragnarok e Lucifer and the Biscuit Hammer. Produzindo conteúdo sobre anime ruim Um anime ruim pode provocar diversos sentimentos em quem assiste, varia da pessoa. Assim como é possível achar graça na 'ruindade' da produção, às vezes um anime ofende sua inteligência de forma quase pessoal e acompanhar cada episódio se torna um martírio. Essas várias reações ficaram bem evidentes quando conversei com algumas pessoas que, de forma proposital ou não, se expuseram a animes de qualidade bastante questionável para produzir conteúdo na internet. Conhecido pelo podcast Kitsune da Semana do portal Geek Here, Leonardo Kitsune pode ser considerado um homem forte. Com o objetivo de trazer análises profundas para seus espectadores, o crítico já foi colocado para acompanhar mangás e animes péssimos como King's Game The Animation. Para se ter uma ideia da ruindade desta produção, essa série é a continuação animada de um mangá que não foi adaptado para anime, então essa continuação mesclou a nova história com flashbacks da anterior, uma confusão de baixíssima qualidade e coerência. Talvez por causa do trabalho como crítico, Kitsune acaba tendo uma visão quase educacional sobre animes ruins. 'Antes de mais nada, anime ruim é sempre uma lição. É sempre bom ver algo realmente ruim para aprender o que não fazer, e valorizar os animes bons de verdade', refletiu. Um fator importante, afinal avaliações nascem de comparações, e quanto maior a quantidade de animes assistidos você se torna mais capaz de analisá-los e classificá-los. Quando perguntado se era possível se divertir com animes ruins, Kitsune considerou 'diversão' uma palavra forte, e enumerou as gradações possíveis de um anime ruim. 'Tem anime tedioso, que não me traz nada. E tem anime estúpido, que só toma decisões absurdas, e aí você se diverte vendo até onde ele vai chegar', concluiu o crítico. Dessa explicação podemos concluir que o importante para um anime é causar uma reação em quem assiste, seja ela de prazer, diversão ou ódio. Como um também apreciador de obras audiovisuais ruins, percebi que as mais atraentes para mim são as capazes de darem a volta e se tornarem comédias involuntárias. Acredito ter gostado de forma igual com Death Note, um clássico com várias qualidades reconhecidas, e com Platinum End, este uma patacoada sem tamanho. Cada uma dessas histórias conquistou minha atenção de uma forma diferente, Death Note me trazendo diversão e expectativa enquanto Platinum End com ódio recreativo, um sentimento de 'raiva controlada' que uso para desestressar. Essa classificação de várias 'ruindades' diferentes parece ser comum entre produtores de conteúdo. Guto Barbosa é o youtuber por trás do canal Cronosfera, um lugar para críticas e listas dos animes e mangás mais queridos da atualidade… e dos menos queridos também. Guto utiliza algumas categorias diferentes de ruindades para animes, como o \"ruim puro\", quando o anime é ruim desde sempre, às vezes até com a consciência por parte da equipe de produção de que aquilo é ruim. \"Me diverte imaginar todas as horas de processo criativo de todos esses setores para realizar algo que no fundo todo mundo sabia que era terrível\", afirmou. Quando explicou o que o levava a se divertir com um anime ruim, Guto chegou no ponto principal para essa discussão: é necessário ao otaku um pouco de abstração. \"Sou uma pessoa que consegue abstrair bastante, às vezes mais do que devia, então mesmo nas mais terríveis histórias tem uma ou outra coisa que dá pra você tirar de bom\". Vários exemplos foram apontados como coisas boas em um anime ruim, como \"uma frase de impacto, um traço de personagem ou sentimento que te ajuda a se relacionar com outras obras, ou pelo menos entender o que não devia ser feito pra se atingir uma qualidade mínima\". De alguma forma, é como se o anime ruim também te ajudasse a crescer e evoluir sua forma de apreciar os animes. Essa abstração foi fundamental para uma dos quadros de maior sucesso no canal Cronosfera, o \"Deixa que eu te conto\". Nesses vídeos especiais Guto conta para o espectador como foi sua experiência com animes horríveis, narra detalhes da história que parecem não fazer sentido e sempre encontra graça ao falar das maiores atrocidades já cometidas pela indústria do anime no Japão. Embora 90% dos animes deste quadro sejam obras mais desconhecidas, ainda assim geram mais engajamento que vídeo de obras cultuadas como One Piece, Naruto e Dragon Ball. Como o youtuber explica esse fenômeno? \"Se você discorda com um tom mais áspero, gera um tipo de reação; e quando discorda rindo, outro. Tirando um caso específico, todos os vídeos do bloco são em tom leve, contando tudo que acontece nos episódios e rindo das situações ou construções narrativas inusitadas\", revelou. No fim, Guto acredita que o público é atraído por conta do bom humor e da curiosidade de ver um \"não assista esse anime\" na capa de um vídeo. Recentemente o canal Cronosfera analisou o filme Dragon Ball Z - O Poder Invencível (1993), o primeiro com Broly como vilão. No começo do cenário otaku no Brasil esse filme era muito compartilhado de fã para fã através de fitas VHS copiadas, muitas vezes sem legenda, e era bastante aclamado pelas ótimas cenas de ação e pelo vilão sem limites. Quando o filme foi localizado para o nosso idioma, conseguimos notar que… bem… a história não faz muito sentido. Os intervalos de tempo são confusos, os personagens agem de forma diferente da série criada por Akira Toriyama e, pior de tudo, o motivo que levou Broly a detestar Goku é muito rasteiro. Guto explicou como não atiraram pedras quando precisou criticar um filme amado pelos fãs da obra: 'Tenho uma boa relação com os fãs de Dragon Ball, e sei que muitos que amam a franquia e o filme em questão concordam comigo em algum nível. Então pra mim funciona quase como um papo descontraído e amigável entre amigos, vocês gostam ou desgostam de um anime e conversam sobre isso dando risada', justificou o youtuber. Está tudo bem gostar de anime ruim Seja como Guilty Pleasure ou de uma forma didática, não há problema em gostar de um anime ou mangá ruim. Mesmo se você leitor não conseguir abstrair as (baixas) qualidades da produção, o sentimento de inconformidade causado por uma animação ruim pode ser facilmente subvertido em risadas. Além disso, assumir os elementos negativos de seu anime favorito torna as discussões na internet mais leves, um respiro em tempos com discussões sempre tão pesadas. O seu anime favorito não é uma unanimidade, e está tudo bem com isso. E lembra sobre o que foi falado sobre a fraca aceitação do público de Bleach quando o Thousand-Year Blood War foi publicado na Shonen Jump? Aproveitei o papo com o Kitsune para perguntar o que ele acha desse arco que será adaptado para anime agora em outubro, afinal na época o crítico acompanhou semanalmente no mangá cada reviravolta criada por Tite Kubo. A resposta foi uma síntese sobre o assunto desta matéria: 'Bleach, pra mim, sempre foi o mangá que se superava no absurdo das decisões de narrativa. Então, aprendi a abraçar a idiotice e lia pra ver qual seria a próxima decisão bizarra de roteiro. Esse arco final, em especial, é um acidente de trem delicioso. É o Fyre Festival dos mangás. Uma taxa de 100% de erro. Era impressionante.' (Leonardo Kitsune) É muito bom se divertir com anime e mangá ruim.",
        "image": "https://cdn.ome.lt/x_7BB_74axxsYqV2NKgYw9auxvc=/1200x630/smart/extras/conteudos/bleach-novo-anime.jpg",
        "url": "https://www.omelete.com.br/anime-manga/diversao-animes-mangas-ruins",
        "score": 0,
        "categoryId": 37,
        "createdAt": "2022-09-15T20:29:43.941Z",
        "publicatedAt": "2022-09-14 20:06:42",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 237,
        "title": "Este foi o feito mais impressionante de Sasuke Uchiha em Naruto Clássico",
        "description": "Embora seja uma única obra, a primeira parte de Naruto é extremamente diferente da segunda, principalmente em termos de escala, já que no começo da história os níveis de poder eram bem mais nivelados, enquanto na segunda parte Naruto e Sasuke viram praticamente deuses. Por isso, analisar os feitos de cada personagem na primeira parte do anime é um pouco mais fácil, e hoje abordaremos justamente a principal proeza realizada por Sasuke durante esse período. O feito mais impressionante de Sasuke em Naruto Clássico Embora muitos possam imaginar que estejamos falando da sua batalha contra Naruto, vale lembrar que o grande pico de poder que Sasuke utilizou nessa luta foi derivado da Marca da Maldição de Ororchimaru, ou seja, os méritos não são totalmente seus. Dessa forma, o seu maior feito conquistado apenas com trabalho duro, ocorreu durante a sua luta contra Gaara no Torneio Chunin. Tendo apenas 1 mês de treinamento com Kakashi, Sasuke conseguiu se tornar tão rápido quanto Lee e ultrapassou a velocidade da areia de Gaara. Além disso, o seu domínio do Chidori foi tão perfeito que em um único ataque ele conseguiu penetrar tanto o Escudo de Areia de Garra como a sua armadura, algo que nem mesmo a Lótus Reversa de Lee foi capaz de fazer. Naruto Shippuden foi exibido entre os anos de 2007 e 2017, contando a segunda fase do anime. Nela, Naruto retorna após dois anos de treinamento com a missão de combater a Akatsuki e resgatar Sasuke das garras de Orochimaru. Ao todo, o anime conta com 500 episódios, finalizando a história de Naruto, Sasuke, Sakura e Kakashi e preparando o terreno para a continuação direta da história. O anime pode ser acompanhado na íntegra no Crunchyroll, juntamente com Naruto clássico e Boruto: Naruto Next Generations, sua continuação direta. No post de hoje, explicamos uma coincidência dos filmes de Naruto que quase nenhum fã notou.",
        "image": "https://criticalhits.com.br/wp-content/uploads/2019/09/proeza-sasuke.jpg",
        "url": "https://criticalhits.com.br/anime/este-foi-o-feito-mais-impressionante-de-sasuke-uchiha-em-naruto-classico/",
        "score": 0,
        "categoryId": 37,
        "createdAt": "2022-09-15T20:29:43.934Z",
        "publicatedAt": "2022-09-14 19:51:13",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 236,
        "title": "Em qual episódio de Boruto Ao morre",
        "description": "Boruto é um dos maiores animes da atualidade, e hoje vamos te mostrar em qual episódio de Boruto Ao morre. Reprodução: Boruto: Naruto Next Generations Animes tendem a ter muitos momentos épicos ao decorrer dos episódios, e em muitos momentos os fãs até mesmo esquecem em qual episódio esse 'tal' momento épico aconteceu, por isso hoje vamos te ajudar a relembrar um dos momentos mais épicos de Boruto: Naruto Next Generations. Foi uma grande surpresa para os fãs de Boruto descobrir que Ao virou um membro da organização Kara. A morte dele acontece durante o episódio 187 do anime de Boruto: Naruto Next Generations Reprodução: Boruto: Naruto Next GenerationsConfira também Boruto: Naruto Next Generations é a sequência direta de Naruto Shippuden, tanto no anime quanto no mangá. Nesta nova história, acompanhamos Boruto, filho de Naruto. Juntamente com seus colegas de Time 7, eles vivem novas aventuras e interagem com antigos e novos personagens da franquia. Atualmente, Boruto está adaptando o terceiro grande arco do mangá, com a apresentação de Kawaki, Kashin Koji, Jigen e outros personagens marcantes da história. No post de hoje, nós respondemos em qual episódio de Boruto Ao morre. Você pode acompanhar o anime de Boruto na íntegra no Crunchyroll e ganha novos capítulos toda semana. Já o mangá de Boruto é publicado no Brasil pela Panini.",
        "image": "https://criticalhits.com.br/wp-content/uploads/2022/09/latest-31.jpg",
        "url": "https://criticalhits.com.br/anime/em-qual-episodio-de-boruto-ao-morre/",
        "score": 0,
        "categoryId": 37,
        "createdAt": "2022-09-15T20:29:43.928Z",
        "publicatedAt": "2022-09-15 17:37:35",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 235,
        "title": "One Piece: Cosplay de Nami por brasileira é aurora do País de Wano",
        "description": "Em maior ou menor grau, Nami é uma tripulante fundamental dos Chapéus de Palha em todos os arcos nos mais de mil episódios de One Piece. Dito isso, é natural que a personagem tenha uma legião de fãs ávidos para homenageá-la. Confira um cosplay de Nami com sua 4ª roupa no País de Wano, feito pela artista brasileira Tainá Marjore, que já apareceu no IGN Brasil com uma versão caprichada de Nico Robin. Para mais, descubra qual é o maior arco de One Piece até o momento, bem como a saga. Aproveite também para descobrir como seriam os personagens do anime se existissem na vida real. One Piece: Quando o anime vai acabar? Em recente nota aos fãs do mangá -- que foi lançado em 1997 --, Eiichiro Oda compartilhou uma mensagem emocionante sobre o arco final da longa franquia. 'Quando eu era garoto, sempre sonhei em ser alguém que criaria o mangá com o arco final mais empolgante de todos. Espero estar à altura do desafio! Agora, temos só um restinho do arco Wano, e tudo está pronto. Me preparei para isso durante 25 anos! Dito isso, está tudo certo se você resolver ler One Piece começando deste ponto, porque a partir de agora, abordaremos O One Piece! Vou desenhar todos os novos mistérios deste mundo e será super interessante. Apertem os cintos e, por favor, fiquem comigo só mais um tempinho.' Embora Oda não tenha especificado o \"tempinho\", podemos prever baseado na duração dos arcos anteriores e também em entrevistas. Em agosto de 2020, o criador de One Piece afirmou que o mangá deve acabar em cerca de 4 ou 5 anos, ou seja, 2025 no máximo. A Saga Yonkou, última publicada até o momento e que acabará nas próximas semanas, começou em 2015 no mangá e em 2016 no anime. Atualmente, a diferença na história entre as duas mídias é de cerca de um mês. Ou seja, podemos dizer que a saga demorou cerca de 6 anos para ser finalizada. Usando como base tais métricas e fazendo a média entre as janelas mencionadas acima, podemos chegar no fatídico ano de 2026, o possível ano do fim de One Piece. Inscreva-se no canal do IGN Brasil no Youtube e visite as nossas páginas no Facebook, Twitter, Instagram e Twitch! | Siga Matheus Bianezzi no Twitter e Instagram.",
        "image": "https://sm.ign.com/t/ign_br/screenshot/default/blob_gk7n.1200.jpg",
        "url": "https://br.ign.com/one-piece-2/102416/news/one-piece-cosplay-de-nami-por-brasileira-e-aurora-do-pais-de-wano",
        "score": 0,
        "categoryId": 37,
        "createdAt": "2022-09-15T20:29:43.923Z",
        "publicatedAt": "2022-09-14 13:13:56",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 234,
        "title": "Este é o motivo pelo qual Orochimaru nunca utilizou todo o seu poder em Naruto Shippuden",
        "description": "Naruto e Naruto Shippuden são dois dos melhores animes de todos os tempos, e possuem alguns dos vilões mais memoráveis de todos os tempos, como Orochimaru por exemplo. Porém, a importância de Orochimaru diminuiu bastante durante a parte Shippuden, chegando ao ponto de nunca termos visto o poder completo do personagem. No post de hoje, esclareceremos o motivo pelo qual nós nunca vimos o verdadeiro poder dele durante a história. Por que Orochimaru nunca usou todo o poder dele em Naruto Shippuden Quando Orochimaru e a Aldeia da Areia atacaram a Aldeia da Folha durante o Exame Chunin, ele tinha um plano importante em mente: vingar-se do Terceiro Hokage e colocar a semente da discórdia na cabeça de Sasuke Uchiha, com o objetivo de recrutá-lo e tomar conta do corpo dele no futuro. O que Orochimaru não esperava era que ele teria uma batalha tão intensa contra o Terceiro Hokage a ponto de perder o movimento dos braços por alguns anos. Como você deve se lembrar, Orochimaru teve as mãos seladas pelo Selo do Deus da Morte de Hiruzen, e ficou com os braços completamente inutilizados. O que pouca gente percebeu é o seguinte: quando Orochimaru obteve um corpo novo na segunda fase do anime, ele não voltou a ter a habilidade de usar jutsus com as mãos. Mesmo com um corpo novo, Orochimaru ainda não tinha a 'alma' dos braços, se é que isto faz sentido. Isto significa que apesar de conseguir usar as mãos em seu cotidiano, ele não era capaz de utilizar jutsus através delas, mesmo que trocasse de corpo mil vezes. Isso fica provado no combate entre Orochimaru e Naruto, onde ele não usa um Jutsu com as mãos sequer, e apenas usa invocações e jutsus já colocados no pulso dele previamente, provavelmente por Kabuto. Com isso, em todo combate que Orochimaru se envolveu após a invasão da Folha, ou seja, a luta dos três Sannins, Naruto e Orochimaru e depois Sasuke e Orochimaru, onde ele já estava bem debilitado, foram totalmente sem jutsus que envolvem as mãos. Ele só recuperou a alma de seus braços no fim do anime, quando reverteu o Selo do Deus da Morte para reinvocar os Quatro Hokages e virar o rumo da Guerra Ninja, mas mesmo ali não pudemos vê-lo lutando pra valer. Em Boruto, vimos Orochimaru derrubar um membro de fora da Kara com facilidade. Será que veremos ele novamente em ação? Confira também Naruto Shippuden foi exibido entre os anos de 2007 e 2017, contando a segunda fase do anime. Nela, Naruto retorna após dois anos de treinamento com a missão de combater a Akatsuki e resgatar Sasuke das garras de Orochimaru. Ao todo, o anime conta com 500 episódios, finalizando a história de Naruto, Sasuke, Sakura e Kakashi e preparando o terreno para a continuação direta da história. O anime pode ser acompanhado na íntegra no Crunchyroll, juntamente com Naruto clássico e Boruto: Naruto Next Generations, sua continuação direta. No post de hoje, explicamos por que Orochimaru nunca usou todo o poder dele em Naruto Shippuden.",
        "image": "https://criticalhits.com.br/wp-content/uploads/2022/06/orochimaru-boruto.jpg",
        "url": "https://criticalhits.com.br/anime/este-e-o-motivo-pelo-qual-orochimaru-nunca-utilizou-todo-o-seu-poder-em-naruto-shippuden/",
        "score": 0,
        "categoryId": 37,
        "createdAt": "2022-09-15T20:29:43.915Z",
        "publicatedAt": "2022-09-15 00:13:33",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 233,
        "title": "Este é um poder do Rinnegan tão poderoso que só foi mostrado uma única vez em Naruto Shippuden",
        "description": "O Rinnegan é uma das técnicas mais raras e poderosas de todo Naruto Shippuden. O Doujutsu dá acesso a inúmeros jutsus exclusivos e extremamente poderosos como os Seis Caminhos de Pain e o Shinra Tensei, por exemplo. Na verdade, os jutsus do Rinnegan podem ser utilizados em praticamente qualquer situação, seja para reviver os mortos como Nagato fez ou para trazer dois meteoros do céu, como Madara. Porém, existe um jutsu do Rinnegan tão poderoso que só foi utilizado uma única vez em todo Naruto Shippuden, incluindo os fillers. Quando Nagato invocou a estátua Gedo Mazou pela primeira vez, a estátua absorveu praticamente todo o chakra do jovem Uzumaki para criar um dragão roxo que sugou a alma de todos os ninjas do exército de Hanzo somente de encostar neles. Este jutsu, que não possui nome, nunca mais foi mostrado em ação, e não sabemos o motivo por trás disto. Talvez o autor de Naruto tenha decidido nerfar o Rinnegan removendo esta técnica, ou talvez Nagato simplesmente não fosse mais capaz de utilizá-la novamente. Também existe a chance de que Nagato tenha perdido as forças e precisou passar vários anos utilizando os Seis Caminhos de Pain por consequência deste dragão de chakra, o que até faz bastante sentido, se pararmos para pensar. Qualquer que seja o caso, seria interessante vermos este dragão novamente um dia. Nagato – Reprodução: NarutoNaruto Shippuden foi exibido entre os anos de 2007 e 2017, contando a segunda fase do anime. Nela, Naruto retorna após dois anos de treinamento com a missão de combater a Akatsuki e resgatar Sasuke das garras de Orochimaru. Ao todo, o anime conta com 500 episódios, finalizando a história de Naruto, Sasuke, Sakura e Kakashi e preparando o terreno para a continuação direta da história. O anime pode ser acompanhado na íntegra no Crunchyroll, juntamente com Naruto clássico e Boruto: Naruto Next Generations, sua continuação direta. No post de hoje, comentamos sobre um poder do Rinnegan que só foi mostrado uma vez em Naruto.",
        "image": "https://criticalhits.com.br/wp-content/uploads/2022/04/Rinnegan-nagato.jpg",
        "url": "https://criticalhits.com.br/anime/este-e-um-poder-do-rinnegan-tao-poderoso-que-so-foi-mostrado-uma-unica-vez-em-naruto-shippuden/",
        "score": 0,
        "categoryId": 37,
        "createdAt": "2022-09-15T20:29:43.910Z",
        "publicatedAt": "2022-09-15 00:15:04",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 232,
        "title": "One Piece Odyssey já tem data de lançamento no PC, Xbox e PlayStation",
        "description": "Começa o ano com um chapéu de palha na cabeça. Para uma manga / anime tão grandiosa como One Piece, é preciso um jogo igualmente grandioso. Os fãs da obra de Eiichiro Oda acreditam que One Piece Odyssey pode ser esse jogo. Não admira, portanto, que seja aguardado com elevadas expectativas, mais do que qualquer outro jogo de One Piece até à data. Hoje a Bandai Namco revelou, de uma vez por todas, a data de lançamento. A data de lançamento de One Piece Odyssey é 13 de Janeiro nas consolas Xbox, PlayStation, e PC. Para celebrar o anúncio, a Bandai Namco revelou um novo trailer que podes ver em cima. One Piece Odyssey é um RPG em desenvolvimento na ILCA (o estúdio do Pokémon Brilliant Diamond e Shining Pearl) onde poderás embarcar em missões e explorar masmorras tal como na manga e anime. A história do jogo começa quando Monkey. D. Luffy e os seus Chapéus de Palha são engolidos por uma grande tempestade no mar e acabam numa ilha misteriosa. Depois de conhecerem Lim e Adio, perdem grande parte dos seus poderes e partem numa aventura na lendária ilha de Waford. One Piece Odyssey PC PS4 PS5 Xbox One Xbox Series X/S",
        "image": "https://assets.reedpopcdn.com/one-piece-odyssey_0Y39SLY.jpg/BROK/thumbnail/1600x900/format/jpg/quality/80/one-piece-odyssey_0Y39SLY.jpg",
        "url": "https://www.eurogamer.pt/one-piece-odyssey-ja-tem-data-de-lancamento-no-pc-xbox-e-playstation",
        "score": 0,
        "categoryId": 37,
        "createdAt": "2022-09-15T20:29:43.905Z",
        "publicatedAt": "2022-09-15 14:31:09",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 231,
        "title": "Splatoon 3: Primeiro Splatfest pós-lançamento já tem data marcada",
        "description": "A Nintendo anunciou que o primeiro Splatfest pós-lançamento de Splatoon 3 irá decorrer de 23 a 25 de setembro. Adiantou ainda que o tema deste Splatfest será: \"O que levarias contigo para uma ilha deserta? Equipamento? Comida? Ou diversão?\" Trailer em Inglês Aqui pela IGN Portugal também ficámos fãs de Splatoon 3. Caso ainda não tenhas feito, fica aqui o convite para leres a nossa análise ao modo single-player de Splatoon 3. Insaciável curioso e consumidor de literatura, videojogos, cinema e anime. Tem preferência por uma boa história. Podes segui-lo em @Riuuzaki_23.",
        "image": "https://sm.ign.com/t/ign_pt/news/s/splatoon-3/splatoon-3-has-had-an-absurdly-big-launch-in-japan_7cb3.1200.jpg",
        "url": "https://pt.ign.com/splatoon-3/116924/news/splatoon-3-primeiro-splatfest-pos-lancamento-ja-tem-data-marcada",
        "score": 0,
        "categoryId": 37,
        "createdAt": "2022-09-15T20:29:43.899Z",
        "publicatedAt": "2022-09-14 02:12:12",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 230,
        "title": "Em qual episódio de Boruto ele se transforma em Borushiki",
        "description": "Boruto é um dos maiores animes da atualidade, e hoje vamos te mostrar em qual episódio de Boruto ele se transforma em Borushiki. Reprodução: Boruto: Naruto Next Generations. Animes tendem a ter muitos momentos épicos ao decorrer dos episódios, e em muitos momentos os fãs até mesmo esquecem em qual episódio esse 'tal' momento épico aconteceu, por isso hoje vamos te ajudar a relembrar um dos momentos mais épicos de Boruto: Naruto Next Generations. Borushiki é a transformação que acontece quando Boruto perde a consciência e deixa Momoshiki dominar completamente seu corpo. A transformação em Borushiki acontece no episódio 207 de Boruto: Naruto Next Generations. Reprodução: Boruto: Naruto Next Generations.Confira também Boruto: Naruto Next Generations é a sequência direta de Naruto Shippuden, tanto no anime quanto no mangá. Nesta nova história, acompanhamos Boruto, filho de Naruto. Juntamente com seus colegas de Time 7, eles vivem novas aventuras e interagem com antigos e novos personagens da franquia. Atualmente, Boruto está adaptando o terceiro grande arco do mangá, com a apresentação de Kawaki, Kashin Koji, Jigen e outros personagens marcantes da história. No post de hoje, nós respondemos em qual episódio de Boruto ele se transforma em Borushiki. Você pode acompanhar o anime de Boruto na íntegra no Crunchyroll e ganha novos capítulos toda semana. Já o mangá de Boruto é publicado no Brasil pela Panini.",
        "image": "https://criticalhits.com.br/wp-content/uploads/2022/09/borushiki-208-boruto-1200x720-1.jpg",
        "url": "https://criticalhits.com.br/anime/em-qual-episodio-de-boruto-ele-se-transforma-em-borushiki/",
        "score": 0,
        "categoryId": 37,
        "createdAt": "2022-09-15T20:29:43.894Z",
        "publicatedAt": "2022-09-15 15:35:45",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 229,
        "title": "Em qual episódio de Boruto Kashin Koji enfrenta Jigen",
        "description": "Boruto é um dos maiores animes da atualidade, e hoje vamos te mostrar em qual episódio de Boruto Kashin Koji enfrenta Jigen. Reprodução: Boruto: Naruto Next Generations. Animes tendem a ter muitos momentos épicos ao decorrer dos episódios, e em muitos momentos os fãs até mesmo esquecem em qual episódio esse 'tal' momento épico aconteceu, por isso hoje vamos te ajudar a relembrar um dos momentos mais épicos de Boruto: Naruto Next Generations. A luta de Kashin contra Jigen foi decisiva e mostrou com o Otsutsuki era extremamente poderoso e praticamente imparável. Jigen lutou contra Kashin Koji no episódio 212 de Boruto: Naruto Next Generations. Reprodução: Boruto: Naruto Next Generations.Confira também Boruto: Naruto Next Generations é a sequência direta de Naruto Shippuden, tanto no anime quanto no mangá. Nesta nova história, acompanhamos Boruto, filho de Naruto. Juntamente com seus colegas de Time 7, eles vivem novas aventuras e interagem com antigos e novos personagens da franquia. Atualmente, Boruto está adaptando o terceiro grande arco do mangá, com a apresentação de Kawaki, Kashin Koji, Jigen e outros personagens marcantes da história. No post de hoje, nós respondemos em qual episódio de Boruto Kashin Koji enfrenta Jigen. Você pode acompanhar o anime de Boruto na íntegra no Crunchyroll e ganha novos capítulos toda semana. Já o mangá de Boruto é publicado no Brasil pela Panini.",
        "image": "https://criticalhits.com.br/wp-content/uploads/2022/09/naruto-boruto-kashin-koji-jigen.jpg",
        "url": "https://criticalhits.com.br/anime/em-qual-episodio-de-boruto-kashin-koji-enfrenta-jigen/",
        "score": 0,
        "categoryId": 37,
        "createdAt": "2022-09-15T20:29:43.852Z",
        "publicatedAt": "2022-09-15 17:02:05",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      }
    ],
    "filmes": [
      {
        "id": 248,
        "title": "Timothée Chalamet revela conselho de Leonardo DiCaprio: 'sem drogas pesadas ou filmes de super-heróis'",
        "description": "Em entrevista à revista Time, em outubro de 2021, Timothée Chalamet revelou que um grande nome de Hollywood havia lhe aconselhado que o segredo para o sucesso seria não usar drogas pesadas ou fazer filmes de super-heróis. Agora, à Vogue, o astro de \"Duna\" (2021) e \"Me chame pelo seu nome\" (2017) admite que foi Leonardo DiCaprio o responsável pela dica. 'Um dos meus heróis me abraçou, na primeira noite em que nos conhecemos, e me deu alguns conselhos. Sem drogas pesadas e sem filmes de super-heróis', lembrou o ator. Até o momento, Chalamet vem seguindo o conselho de DiCaprio no que diz respeita aos filmes de heróis. O ator ainda não se juntou aos universos da Marvel ou da DC nos cinemas. No momento, ele está trabalhando na divulgação de \"Bones and all\" (2022), novo filme de Luca Guadagnino, e será visto em breve em \"Wonka\", sobre a origem de Willy Wonka, personagem de \"A fantástica fábrica de chocolates\", e \"Duna: Parte 2\".",
        "image": "https://s2.glbimg.com/s5wAegXJKR4UF2MFSl9bDUXrl90=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2022/9/L/GfFML7R0mbYxknPou9pg/arte-3-.png",
        "url": "https://oglobo.globo.com/cultura/filmes/noticia/2022/09/timothee-chalamet-revela-conselho-de-leonardo-dicaprio-sem-drogas-pesadas-ou-filmes-de-super-herois.ghtml",
        "score": 0,
        "categoryId": 45,
        "createdAt": "2022-09-15T20:29:46.067Z",
        "publicatedAt": "2022-09-15 17:45:00",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 247,
        "title": "Diretor de Avatar 2, James Cameron acredita que o 3D não está morto",
        "description": "O renomado diretor James Cameron se prepara para o lançamento de Avatar: O Caminho da Água, filme que dá sequência a Avatar (2009). Um dos chamarizes do lançamento é a forte presença do 3D, que parece não agradar mais ao público como na época do primeiro longa. Ainda assim, o cineasta acredita que essa tecnologia não está morta. Em entrevista ao /Film, Cameron explicou por que não acha que o 3D ficou ultrapassado. Comparando essa tecnologia moderna à chegada de cores no cinema, ele afirma que a chegada do 3D mudou a forma como a audiência consome os filmes: 'O 3D parece estar acabado para a maioria das pessoas. Mas não terminou de verdade. Acabou de ser aceito e agora faz parte da sua escolha quando vai ao cinema ver um filme blockbuster. Comparo à cor: quando filmes coloridos surgiram, foi algo grande. As pessoas iam ver filmes porque eles eram coloridos. Acho que na época de Avatar, as pessoas se acostumaram a ver filmes porque eles eram 3D. Acho que teve um impacto em como os filmes eram apresentados e agora isso meio que é aceito e parte do zeitgeist e de como é feito.' Para explicar como o 3D foi revolucionário, o cineasta usou como exemplo o Oscar. Segundo o cineasta, é um marco o fato de que a premiação tenha validado a tecnologia ao premiar filmes que usaram essa tecnologia consecutivamente por vários anos: 'Diria que o 3D foi amplamente aderido por um tempo. Avatar ganhou [o Oscar] de Melhor Fotografia com uma câmera digital 3D. Nenhuma câmera digital havia vencido a categoria antes. Então em dois dos três anos seguintes, as mesmas câmeras foram usadas pelos diretores de fotografia que venceram o Oscar. Então você teve três de quatro anos em que a Academia abraçou a cinematografia digital. E todos os três filmes estavam em 3D.' Avatar: O Caminho da Água chega aos cinemas brasileiros em 16 de dezembro. O elenco tem Sam Worthington, Zoe Saldana, Sigourney Weaver e Kate Winslet. Para comemorar o lançamento da sequência, a Disney vai relançar o primeiro nos cinemas do Brasil em setembro – saiba mais. div-ad-sidebar-halfpage-1",
        "image": "https://uploads.jovemnerd.com.br/wp-content/uploads/2022/09/avatar_james_cameron_3d_nao_esta_morto__0lyw1b.jpg",
        "url": "https://jovemnerd.com.br/nerdbunker/avatar-james-cameron-diz-que-3d-nao-esta-morto/",
        "score": 0,
        "categoryId": 45,
        "createdAt": "2022-09-15T20:29:46.059Z",
        "publicatedAt": "2022-09-14 21:04:16",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 246,
        "title": "007: Diretor de Skyfall diz qual rumo a franquia deveria levar",
        "description": "A franquia 007 é já tem mais de 60 anos e conta com 25 filmes no total. Com uma tradição tão longa, é normal que James Bond tenha mudado várias vezes, e não apenas pelas mudanças dos interpretes do espião. E foram realmente vários interpretes, cinco ao todo até chegar na última versão do personagem interpretada por Daniel Craig, que estrelou como Bond pela quinta e última vez em 007- Sem Tempo para Morrer. Duas dessas vezes o diretor Sam Mendes foi responsável pela direção.Continua depois da publicidade É importante lembrar que as mudanças de elenco acompanham também as mudanças de diretores e de abordagens do personagem. Com a saída de Craig, muito tem se discutido sobre o futuro da franquia e Mendes parece ter uma opinião sobre o assunto. O que Sam Mendes pensa para o futuro de 007 Mendes conversou recentemente com o Deadline sobre a evolução dos filmes de ação, e como essa evolução precisa chegar à franquia 007. 'Eu não invejo Barbara [produtora responsável por 007] por ter que seguir depois dos últimos 5 filmes de Daniel. Ele revigorou a franquia, mas ela é tão grande que é muito difícil para um ator mais jovem entrar nisso.' Disse o diretor. Mendes então refraseou o que quis dizer e declarou: 'Eu acho que o ator de Bond irá evoluir, a direção precisa evoluir. Eu acho que seria incrível ver uma mulher dirigindo Bond. Eu acho que seria incrível.' Mendes, aparentemente, não deseja voltar à direção da franquia 007, mas acredita que a melhor forma da franquia evoluir é com uma mulher na cadeira de diretora. Encontrar alguém que guie os filmes de James Bond para sua nova fase é tão importante quanto a procura de um novo interprete para o personagem. Por enquanto, seguimos sem informações sobre a continuação da franquia 007, mas todos os filmes estão disponíveis na Amazon Prime Video.",
        "image": "https://observatoriodocinema.uol.com.br/wp-content/uploads/2022/09/daniel-craig-james-bond-1200x900-1.jpg",
        "url": "https://observatoriodocinema.uol.com.br/filmes/007-diretor-de-skyfall-diz-qual-rumo-a-franquia-deveria-levarefbfbc",
        "score": 0,
        "categoryId": 45,
        "createdAt": "2022-09-15T20:29:46.055Z",
        "publicatedAt": "2022-09-14 17:15:13",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 245,
        "title": "Timothée Chalamet revela conselho de Leonardo DiCaprio: 'sem drogas pesadas ou filmes de super-heróis'",
        "description": "Em entrevista à revista Time, em outubro de 2021, Timothée Chalamet revelou que um grande nome de Hollywood havia lhe aconselhado que o segredo para o sucesso seria não usar drogas pesadas ou fazer filmes de super-heróis. Agora, à Vogue, o astro de \"Duna\" (2021) e \"Me chame pelo seu nome\" (2017) admite que foi Leonardo DiCaprio o responsável pela dica. Leonardo DiCaprio: de Titanic a Tinder, tudo virou meme sobre 'idade limite' de namoradas do ator; entenda Estreias no cinema: 'Moonage daydream', 'Órfã 2: A origem', 'Uma pitada de sorte' e mais 'Um dos meus heróis me abraçou, na primeira noite em que nos conhecemos, e me deu alguns conselhos. Sem drogas pesadas e sem filmes de super-heróis', lembrou o ator. Até o momento, Chalamet vem seguindo o conselho de DiCaprio no que diz respeita aos filmes de heróis. O ator ainda não se juntou aos universos da Marvel ou da DC nos cinemas. No momento, ele está trabalhando na divulgação de \"Bones and all\" (2022), novo filme de Luca Guadagnino, e será visto em breve em \"Wonka\", sobre a origem de Willy Wonka, personagem de \"A fantástica fábrica de chocolates\", e \"Duna: Parte 2\".",
        "image": "https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo-1200x1200.png",
        "url": "https://esportes.yahoo.com/timoth%C3%A9e-chalamet-revela-conselho-leonardo-141722448.html?src=rss",
        "score": 0,
        "categoryId": 45,
        "createdAt": "2022-09-15T20:29:46.049Z",
        "publicatedAt": "2022-09-15 14:17:22",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 244,
        "title": "Morreu a atriz grega Irene Papas",
        "description": "Morreu a atriz grega, Irene Papas. Tinha 96 anos. A sua morte foi anunciada pelo ministério grego da Cultura Com uma carreira de mais de 50 anos, a atriz ficou conhecida internacionalmente por filmes como \"Os Canhões de Navarone\" e \"Zorba, o Grego\" e pelas interpretações de clássicos da tragédia grega como \"Antígona\", \"Electra\", e \"Efigénia\". Nascida em 1926, numa povoação próxima de Corinto, viveu em Atenas desde os sete anos e aos 15 deu início à carreira como atriz, cantora e dançarina. A sua mãe era professora, e o seu pai ensinava teatro clássico. Papas era fascinada pela representação desde tenra idade e cedo atraiu as atenções de importantes cineastas americanos e se tornou um grande nome para os produtores de Hollywood. Atuou em mais de 70 filmes, mas a sua fama não foi catapultada para o palco internacional até às atuações em 'Os canhões de Navarone' (1961), 'Elektra' (1962) e 'Zorba, o Grego' (1964). Embora o seu primeiro filme americano, \"O Homem do Cairo\", tenha sido pouco impressionante, ela rapidamente subiu nas fileiras em termos de produções. Em \"Tributo a um Homem Mau\" (1956), interpretou a protagonista feminina, Jocasta Constantine, ao lado de James Cagney. Começou então a assumir papéis maiores em filmes de grande sucesso. Infelizmente, apesar do sucesso comercial dos filmes em que Papas estava envolvida, ela era constantemente mal paga e estava frequentemente desempregada; para \"Zorba, o Grego\", recebeu apenas 10.000 dólares, e não conseguiu encontrar um papel durante dezoito meses após a sua aparição no filme. A fama não a salvou do exílio. Em 1967 recusou viver sob a ditadura militar que surgia na Grécia e partiu primeiro para Itália e depois para Nova Iorque, juntamente com outros artistas. Durante o exílio, tanto em Roma como em Hollywood, prosseguiu com o seu trabalho de atriz e colaborou com realizadores como Franco Zeffirelli, Franco Rossi e Costas Gavras. Irene Papas foi, talvez, uma das mais importantes atrizes gregas da sua geração.",
        "image": "https://static.euronews.com/articles/stories/07/01/59/82/1000x563_cmsv2_1222368f-a558-5691-8b7f-1f44d6ae943a-7015982.jpg",
        "url": "http://pt.euronews.com/2022/09/14/morreu-a-atriz-grega-irene-papas",
        "score": 0,
        "categoryId": 45,
        "createdAt": "2022-09-15T20:29:46.043Z",
        "publicatedAt": "2022-09-14 18:46:03",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 243,
        "title": "Morreu a atriz grega Irene Papas",
        "description": "Morreu a atriz grega, Irene Papas. Tinha 96 anos. A sua morte foi anunciada pelo ministério grego da Cultura Com uma carreira de mais de 50 anos, a atriz ficou conhecida internacionalmente por filmes como \"Os Canhões de Navarone\" e \"Zorba, o Grego\" e pelas interpretações de clássicos da tragédia grega como \"Antígona\", \"Electra\", e \"Efigénia\". Nascida em 1926, numa povoação próxima de Corinto, viveu em Atenas desde os sete anos e aos 15 deu início à carreira como atriz, cantora e dançarina. A sua mãe era professora, e o seu pai ensinava teatro clássico. Papas era fascinada pela representação desde tenra idade e cedo atraiu as atenções de importantes cineastas americanos e se tornou um grande nome para os produtores de Hollywood. Atuou em mais de 70 filmes, mas a sua fama não foi catapultada para o palco internacional até às atuações em 'Os canhões de Navarone' (1961), 'Elektra' (1962) e 'Zorba, o Grego' (1964). Embora o seu primeiro filme americano, \"O Homem do Cairo\", tenha sido pouco impressionante, ela rapidamente subiu nas fileiras em termos de produções. Em \"Tributo a um Homem Mau\" (1956), interpretou a protagonista feminina, Jocasta Constantine, ao lado de James Cagney. Começou então a assumir papéis maiores em filmes de grande sucesso. Infelizmente, apesar do sucesso comercial dos filmes em que Papas estava envolvida, ela era constantemente mal paga e estava frequentemente desempregada; para \"Zorba, o Grego\", recebeu apenas 10.000 dólares, e não conseguiu encontrar um papel durante dezoito meses após a sua aparição no filme. A fama não a salvou do exílio. Em 1967 recusou viver sob a ditadura militar que surgia na Grécia e partiu primeiro para Itália e depois para Nova Iorque, juntamente com outros artistas. Durante o exílio, tanto em Roma como em Hollywood, prosseguiu com o seu trabalho de atriz e colaborou com realizadores como Franco Zeffirelli, Franco Rossi e Costas Gavras. Irene Papas foi, talvez, uma das mais importantes atrizes gregas da sua geração. **Não era vista em público há cerca de uma década, após o diagnóstico da doença de Alzheimer. **",
        "image": "https://s.yimg.com/uu/api/res/1.2/VQ2ItmJdRyZBwpCWShPi9Q--~B/aD01NzY7dz0xMDI0O2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/pt/euronews_br_articles_583/8d850ec7e4f0ee416aac98037975e7da",
        "url": "https://esportes.yahoo.com/morreu-atriz-grega-irene-papas-164603290.html?src=rss",
        "score": 0,
        "categoryId": 45,
        "createdAt": "2022-09-15T20:29:46.039Z",
        "publicatedAt": "2022-09-14 16:46:03",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 242,
        "title": "Godard \"mostrou-nos que o cinema não tem limites\"",
        "description": "Jean Luc Godard morreu esta semana aos 91 anos, com mais de 100 filmes, em 60 anos de carreira. Jean Luc Godard o gigante, provocador e prolífico criador de cinema, foi um dos principais nomes da \"Nouvelle Vague\". O produtor português, Paulo Branco, afirma que Jean-Luc Godard \"abriu-nos as portas e mostrou-nos que o cinema não tem limites\". Publicidade RFI: Jean Luc Godard foi fundador de uma estética e de uma linguagem cujos ecos ainda se fazem sentir hoje. Que legado deixa Godard? Paulo Branco: Jean Luc Godard é uma pessoa a quem nós todos devemos tudo. Todos os cineastas, todos os produtores, todas as pessoas que trabalham no cinema, devemos-lhe tudo. Foi ele que, no princípio dos anos 60, nos abriu as portas e explicou como o cinema não tem limites. Ele, um dos grandes admiradores do cinema clássico e do cinema de Hollywood, permitiu que nos transformássemos, de uma certa maneira, abrindo-nos as portas para novas linguagens, novos riscos, na maneira de produzir, na maneira de realizar, em tudo. Na nossa visão. É absolutamente fundamental na história do cinema e uma personagem única. O cinema de Godard caracterizava-se pela mobilidade da câmara, pelos demorados planos-sequências, pela montagem descontínua, pela improvisação e pela tentativa de carregar cada imagem com valores e informações contraditórios... Sim e sobretudo um olhar. Um olhar que para ele é um olhar ético, um olhar em que o cinema para ele é uma questão de moral, como para todo essa geração e que nos obriga, de uma certa maneira, a uma responsabilidade de quando os realizadores filmam, como filmam e o que filmam. Que isso não é impune. É uma das coisas essenciais no cinema moderno e é isso que distingue, se quiser, os grandes filmes dos filmes quase obscenos, como se pode dizer, mesmo se não tenham cenas obscenas. O olhar deles é obsceno e é isso que também nos condiciona como cinéfilos. É isso que nos faz ver o cinema como uma verdadeira arte e com a mesma exigência, a mesma atenção, que temos com as outras artes. Isso foi absolutamente essencial no legado dele e que nós todos aproveitámos. O realizador franco-suíço adoptou inovações narrativas e filmou com a câmara na mão, rompendo com todas as regras até então invioláveis. Qual foi o impacto dessas mudanças no mundo da sétima arte? Foi imenso! Ainda agora e também, ao mesmo tempo que ele fez isso, chamou-nos à atenção para a grandiosidade do cinema clássico, do cinema de Hollywood e dos grandes filmes, dos grandes cineastas que também ele admirava e que, de uma certa maneira, o inspiraram, dando-lhe o poder e dimensão que tem. É um pouco o que o James Joyce trouxe à literatura com o Ulisses, um pouco a mesma coisa. A relação que Jean Luc Godard tinha com o cinema era essa admiração, mas também o trair, entre aspas, todo o legado que ele tinha recebido. É isso que a partir de agora nós, neste momento também, haverá cineastas que, mais tarde ou cedo mais cedo, também trairão, entre aspas, o legado Jean Luc Godard, de maneira que o cinema prossiga a sua trajectória. A surpreender-nos sempre. Jean Luc Godard foi um dos criadores da Nouvelle Vague. Que filmes do realizador mais o marcaram nesta fase? Eu conheço praticamente toda a obra dele. Tive a sorte de conhecer pessoalmente em 1977 e a partir daí ter, até há muito pouco tempo, uma relação com ele. Não posso podia dizer que éramos amigos, mas acho que havia, da minha parte, um respeito enorme, uma admiração e da parte dele também pelo meu trabalho. Eu sabia que ele via muitos filmes que eu tinha produzido e isso permitia, de vez em quando, diálogos. Logicamente mais monólogos do que diálogos, porque eu estaria lá mais para aprender do que para para ensinar o que é que fosse. Tive essa sorte. Qualquer filme dele é um filme que me surpreende. Em qualquer filme dele encontro algo de novo para a minha vivência, não só como mas também como cinéfilo. É difícil para mim, mas logicamente que o primeiro filme quando aparece -\"À bout de souffle\"- foi uma espécie de reviravolta completa naquilo que estávamos habituados a ver. Ele também no próprio cinema dele fez grandes rupturas, mas sempre qualquer filme dele é, para mim, uma fonte inesgotável de aprendizagem. Após o movimento estudantil do Maio de 68, Godard criou, com Jean-Pierre Goran, o grupo de cinema Dziga Vertov, em homenagem a um cineasta russo de vanguarda, e virou-se para o cinema político. Pode dizer-se que era um realizador que estava em permanente revolução? Um militante? Não. Ele era uma pessoa que era um um cidadão do mundo. Era uma pessoa que sentia o que se passava no mundo. Senti o que é que o mundo também teria de ser, reflectido naquilo que se chamava e como se chamava, como teria que passar por momentos de rupturas grandes como foi este momento. Eu por acaso quando o vi, em 1977, foi para lhe pedir a autorização para passar esses filmes todos. Neste período que ele tinha praticamente deixado de passar ou que não dava autorização. A mim deu-me e eu fiz isso no Action République, em Novembro de 77. Nestes períodos, de certa maneira, ele confunde-se com o colectivo, mas não verdadeiramente. O que lá está é dele. Ele deixava-se ser contestado no interior dos próprios filmes, mas deixou sempre momentos inesquecíveis, mesmo nestes filmes. São filmes mais de ruptura e mais datados no tempo, porém ainda agora impressionam quem os vê. A figura de Godard era uma figura muito controversa. Adorado e detestado, aliás esta dicotomia é era um dos seus traços de personalidade…. Era uma pessoa coerente consigo próprio e era uma pessoa, em termos artísticos, com uma enorme inteligência. Essas pessoas, não é uma questão de gostarem, de serem adulados ou a detestados, não é isso, têm o seu trabalho, têm o seu percurso. Por vezes, há pessoas que deixam de lhes interessar ou pessoas que ele reencontra muitos anos depois. São percursos muito especiais. Não haver esta mediocridade que muitas vezes existe nas relações entre as pessoas, uma vez que há demasiado cinismo e demasiado coisas escondidas. Ele não aceitava isso. Há alguma deixa de um filme de Godard que lhe tenha ficado na cabeça e que queira partilhar connosco? Não. Ainda por cima, quase praticamente todas as deixas de Godart, ele foi buscá-las a outros, a maior parte deles a grandes líderes. Portanto, se dissesse agora uma deixa de Godard estava não só a citar Godard, mas alguém que o próprio Godard cita. Nisso ele era um génio absoluto. NewsletterReceba a newsletter diária RFI: noticiários, reportagens, entrevistas, análises, perfis, emissões, programas. Me registro",
        "image": "https://s.rfi.fr/media/display/3647bf8c-2958-11ea-9527-005056bff430/w:1280/p:16x9/godard_2.jpg",
        "url": "https://www.rfi.fr/pt/programas/vida-em-fran%C3%A7a/20220915-godard-mostrou-nos-que-o-cinema-n%C3%A3o-tem-limites",
        "score": 0,
        "categoryId": 45,
        "createdAt": "2022-09-15T20:29:46.031Z",
        "publicatedAt": "2022-09-15 15:28:31",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 241,
        "title": "Análise: Saiba como a moda em Jean-Luc Godard marcou toda a história do cinema",
        "description": "A cena é bastante conhecida. Uma moça jovem e bonita, com os cabelos bem curtos, anda pela avenida Champs-Élysées entre carros, vendendo o jornal New York Herald Tribune. Ela veste camiseta, calças cigarrete justas e estreitas, que terminam na altura do tornozelo, e sapatilhas pretas, sapatos de couro simples e sem salto. É uma cena do filme \"Acossado\", o primeiro longa-metragem de Jean-Luc Godard, com roteiro de François Truffaut. Lançado em 1960, protagonizado por Jean Seberg e Jean-Paul Belmondo, o filme é um thriller policial que conta a história da paixão entre Michel Poiccard, um ladrão, e Patricia, uma jovem americana que tenta a vida em Paris. Jean Seberg e Jean-Paul Belmondo em 'Acossado', de 1960 - IMDB/Divulgação Não existe nada de especial no figurino de Jean Seberg, cujo famoso corte de cabelo foi criado pelas irmãs Maria Carita e Rosy Carita, que tinham clientes famosas, entre elas Josephine Baker. Entretanto, a simplicidade do look não impediu que essa cena se tornasse uma das mais icônicas da história do cinema. Isso porque a década de 1960 foi um momento de transformação radical na história da cultura no Ocidente, em que uma nova atitude se impôs. Para a moda, foi um período crucial. Valorização da juventude, simplificação das linhas, abandono do ornamento, minissaia, \"revolução do pavão\", desenvolvimento singular da indústria têxtil. Mas, acima de tudo, o elogio da liberdade no vestir. Como afirmou o historiador da moda François Baudot, \"antigamente, não seguir a linha dominante da moda indicava que se era pobre\". \"A partir dos anos 1960, isso significa muito claramente que se é livre.\" Veja imagens dos filmes de Jean-Luc Godard Os personagens dos filmes de Godard não são da alta burguesia. São pessoas comuns ou figuras marginais (bandidos, prostitutas), gente que de alguma maneira está à margem das regras da sociedade burguesa. Em \"Acossado\", por exemplo, a roupa usada por Belmondo remete aos paletós quadrados dos gângsteres de filmes americanos, com o chapéu de lado e o cigarro na boca. Jean Seberg, por sua vez, está vestida como uma jovem de seu tempo. \"A margem é o que sustenta as páginas\", escreveu Jean-Luc Godard. Esse figurino, criado de acordo com um modelo de cinema feito com poucos recursos financeiros, foi capaz de expressar a força da informalidade, da juventude, do vestir cotidiano, que àquela altura começava a ganhar espaço na indústria da moda. Foi também em \"Acossado\" que pela primeira vez apareceram na tela roupas de baixo masculinas e femininas. As cenas da intimidade do jovem casal, em que ele está de cueca, e ela, de camisola, foram uma grande inovação e representaram a liberdade de costumes do cinema francês (e europeu, de modo geral) em relação ao americano. Se, por um lado, as roupas nos filmes de Godard são tal como eram vestidas pela maioria das pessoas na época, muitas vezes ele usou os trajes de seus personagens para fazer referência a algum elemento do próprio cinema. É o caso do trench coat, um casaco longo em estilo militar, peça importante que aparece em diversos filmes. Foi usado por Jean-Paul Belmondo em \"Acossado\", pelo detetive Lemmy Caution, papel de Eddie Constantine, em \"Alphaville\", e por Anna Karina, em \"Made in USA\". Morre Anna Karina, atriz símbolo da nouvelle vague Diferentemente de outros diretores da nouvelle vague que convocaram estilistas franceses conhecidos, Jean-Luc Godard não recorreu ao poder das maisons parisienses para criar os figurinos de seus filmes. Mas as roupas desempenham papel fundamental em sua obra. Tanto é assim que alguns looks icônicos de seus personagens, como os figurinos de Anna Karina (que foi casada com o diretor) ou a roupa de Brigitte Bardot em \"O Desprezo\", servem até hoje de inspiração para a moda. Mesclando elementos da história do cinema com trajes prosaicos e cotidianos, Godard foi capaz de compor imagens fortes com as roupas. Os objetos de vestuário participam de cenas marcantes, que entraram para a história do cinema. Conheça os principais filmes de Jean-Luc Godard",
        "image": "https://f.i.uol.com.br/fotografia/2018/02/08/15181243915a7cbd67729db_1518124391_3x2_lg.jpg",
        "url": "https://www1.folha.uol.com.br/ilustrada/2022/09/saiba-como-a-moda-em-jean-luc-godard-marcou-toda-a-historia-do-cinema.shtml",
        "score": 0,
        "categoryId": 45,
        "createdAt": "2022-09-15T20:29:46.025Z",
        "publicatedAt": "2022-09-14 10:00:00",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 240,
        "title": "Público acredita na morte de Queen Latifah ao confundir atriz com Elizabeth II  Séries em Cena",
        "description": "É isso mesmo que você leu! A morte da rainha Elizabeth II causou confusão na América, isso porque aparentemente muitas pessoas estavam enxugando as lágrimas pensando que outra rainha famosa havia falecido. A atriz Queen Latifah, que está em alta por conta de um novo filme na Netflix. Segundo o TMZ, muita gente achou que Latifah havia falecido. De acordo com o canal, a coisa toda começou depois que alguém twittou: 'Eu disse à minha mãe que a rainha [queen em inglês] morreu, ela falando sobre ‘LATIFAH ????'', desde então o boato pegou fogo na internet. O tweet já conta com quase 300 mil curtidas. I told my mama the Queen died, she talking about 'LATIFAH ????' 😭😭😭 girl— 💗 its j a d e to you bitch (@JadeForeverr_) September 8, 2022 Outro grupo tentou tranquilizar os em pânico de que a amada atriz/rapper de 52 anos estava viva e bem. Recentemente, Latifah disse ao apresentador James Corden algum tempo atrás que ela colocou uma cláusula de 'não morte' em seus contratos de atuação para que ela não pudesse ser morta em filmes futuros. 'Quando eu comecei a fazer filmes, sempre tive essas cenas de morte… e aparentemente morri bem demais. E então eu entendi, tipo, espere um minuto, se eu morrer nesses filmes, não posso estar na sequência!' Vida longa a rainha!",
        "image": "https://emoff.ig.com.br/wp-content/uploads/2022/09/Queen-Latifah-Queen-Elizabeth-II.jpg",
        "url": "https://emoff.ig.com.br/colunas/series-em-cena/publico-acredita-na-morte-de-queen-latifah-ao-confundir-atriz-com-elizabeth-ii/",
        "score": 0,
        "categoryId": 45,
        "createdAt": "2022-09-15T20:29:46.013Z",
        "publicatedAt": "2022-09-15 17:57:24",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 239,
        "title": "Anna Kendrick revela grupo secreto de Escolha Perfeita no Whatsapp",
        "description": "Reprodução / Internet Redação - Observatório dos Famosos 15/09/2022 07:24 compartilhe SIGA NO A estrela europeia Anna Kendrick confirmou que um bate-papo em grupo entre os membros do elenco de Pitch Perfect está vivissimo e vai indo muito bem, obrigada! Anna recentemente refletiu sobre as amizades que formou enquanto estrelava os três filmes da franquia e, embora tenham se passado cerca de 10 anos desde que o primeiro filme chegou aos cinemas, as memórias continuam a chegar-lhe. 'Nós estamos mandando mensagens um para a outra tipo, 'Oh meu Deus, vocês já se passaram quase 10 anos e se lembram desta noite?'' disse Anna exclusivamente ao E! Notícias do chat em grupo. A franquia de filmes, que contou com estrelas como Brittany Snow, Rebel Wilson, Elizabeth Banks e Anna Camp, divulgou filmes em 2012, 2015 e 2017. Anna explicou que, ao longo desse tempo, o vínculo entre o elenco cresceu forte o suficiente para parecer como uma familia. 'Acho que no terceiro filme, realmente parecia que essas garotas são uma família, da maneira que você nem escolhe sua família', ela compartilhou. 'Sou muito grata por ter esses relacionamentos e ter essa família estranha e acidental'. Enquanto Anna deixou seus dias como Beca para trás, a atriz de 37 anos recentemente assumiu um novo papel como Alice Davis no filme Alice, Darling. O filme de suspense - que fez sua apresentação de gala de estreia mundial no Roy Thomson Hall no Festival Internacional de Cinema de Toronto em 11 de setembro - gira em torno de Alice, que encontra perspectiva depois de atingir um ponto de ruptura em um relacionamento abusivo. Anna disse que o projeto oferecia um estilo que ela ainda não conhecia. 'Eu tinha visto alguns filmes, The Assistant e este filme Swallow, e fiquei muito interessada na ideia de como você pode ser contido no papel', disse ela. 'Esta foi uma grande oportunidade para mim e acho que todos participaram desse exercício de contenção e confiando que o que colocamos na tela era evidência suficiente para ser uma história'. A Lionsgate lançará Alice, Darling nos cinemas no primeiro semestre de 2023.O post Anna Kendrick revela grupo secreto de Escolha Perfeita no Whatsapp foi publicado primeiro em Observatório dos Famosos. compartilhe",
        "image": "https://i.uai.com.br/LtB58rcbDqHyQQy11OFtny3LIts=/600x315/smart/imgsapp2.uai.com.br/app/noticia_133890394703/2022/09/15/301009/anna-kendrick_1_45492.jpg",
        "url": "https://observatoriodosfamosos.uol.com.br/?p=628789",
        "score": 0,
        "categoryId": 45,
        "createdAt": "2022-09-15T20:29:46.001Z",
        "publicatedAt": "2022-09-15 10:24:00",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      }
    ],
    "games": [
      {
        "id": 258,
        "title": "Marketplace de criadora do jogo Fortnite lista primeiro game NFT",
        "description": "LOS ANGELES, CA – JUNE 12: Game enthusiasts and industry personnel visit the ‘Fortnite' exhibit during the Electronic Entertainment Expo E3 at the Los Angeles Convention Center on June 12, 2018 in Los Angeles, California. (Photo by Christian Petersen/Getty Images) O marketplace de jogos da Epic Games, criadora do Fortnite, listou o game NFT 'Blankos Block Party', do estúdio Mythical Games, segundo comunicado divulgado à imprensa nesta quinta-feira (15).Esse é o primeiro jogo baseado em tokens não fungiveis (NFTs) listado na plataforma.O lançamento ocorre menos de um ano depois de a Mythical Games levantar US$ 150 milhões em uma rodada de financiamento Série C, ficando com uma avaliação de US$ 1,25 bilhão.O Blankos Block Party é um jogo multiplayer gratuito com brinquedos de vinil digitais colecionáveis exclusivos chamados Blankos, que são NFTs que podem ser comprados, atualizados e vendidos dentro do jogo.O jogo foi desenvolvido pela Mythical Games em parceria com a Third Kind Games.O estúdio de desenvolvimento de games em blockchain Gala Games anunciou em junho que traria seus jogos de Web 3.0 para os 194 milhões de usuários da Epic Games Store, mas seu primeiro título, o GRIT, ainda não foi listado.Até onde as criptomoedas vão chegar? Qual a melhor forma de comprá-las? Nós preparamos uma aula gratuita com o passo a passo. Clique aqui para assistir e receber a newsletter de criptoativos do InfoMoneyCadastre-se e descubra como surfar o Boom do Metaverso e transformar essa evolução tecnológica em excelentes oportunidades de investimentos Relacionados Compartilhe Mais sobre",
        "image": "https://www.infomoney.com.br/wp-content/uploads/2020/08/GettyImages-972799818.jpg?fit=1024%2C683&quality=70&strip=all",
        "url": "https://www.infomoney.com.br/mercados/marketplace-de-criadora-do-jogo-fortnite-lista-primeiro-game-nft/",
        "score": 0,
        "categoryId": 47,
        "createdAt": "2022-09-15T20:29:48.218Z",
        "publicatedAt": "2022-09-15 18:13:16",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 257,
        "title": "5G vai transformar toda a cadeia na indústria de games",
        "description": "A experiência dos gamers vai ser transformada com a chegada do 5G. Mas o impacto da nova tecnologia vai ser sentida em toda a cadeia da indústria de games. Essa é a percepção de Gláucio Marques, CEO da Level Up, empresa líder na distribuição e publicação de games mobiles. \"O mercado ainda é incipiente, mas a experiência do consumidor de games vai ser totalmente transformada\", diz. A quinta geração de internet móvel oferece baixa latência, ou seja, tempo de resposta muito reduzido, e altíssima velocidade. Com isso, os jogadores vão poder fazer downloads mais eficientes, com atualizações programadas de forma contínua. \"Isso mexe com a experiência do jogador, pois o jogo não trava. Você consegue efetuar um comando, e ele se dá de forma mais rápida. O jogo fica mais fluido. Alguns milissegundos geram uma experiência não tão boa para o jogador. Com o 5G, o jogador tem mais prazer ao jogar, e consequentemente mais pessoas vão querer jogar juntos e a base de jogadores vai crescer também.\" Essa democratização do acesso, com mais gente jogando, também deve impulsionar a indústria de desenvolvimento de jogos, especialmente o setor de cloud gaming, ou jogos em nuvem, que permitem enorme interatividade, com vários jogadores interagindo ao mesmo tempo, de vários lugares do mundo. \"O jogo fica na nuvem e você joga onde estiver, no trem, no metrô, na escola ou em casa e em qualquer tipo de tela. Seu device, seja um celular, seja um computador, vai servir apenas para processar as imagens. você leva o jogo pra onde você for\", diz Marques. Ele acredita que com a portabilidade, um mercado que já é bilionário vai se aquecer ainda mais. Como consequência, o Brasil, que já se posiciona como um dos grandes mercados mundiais em games, vai se fortalecer ainda mais. \"O Brasil deve crescer, especialmente nos jogos competitivos, que vão acelerar.\" Esses e outros temas vão ser debatidos no Seminário 5G.BR, que acontece em Natal (RN), amanhã, 15 de setembro, no Hotel Holiday Inn. Durante o evento será discutida a relação entre o 5G, os  games e as profissões do futuro, incluindo a abertura de vagas no mercado de trabalho em diversos setores de tecnologia, como o desenvolvimento de games, o metaverso e os NFTs, entre outros ambientes. Estarão presentes os influenciadores e gamers Gordox (William Rodrigues) e Muca Muriçoca (Murilo Cervi), que vão falar sobre as novas oportunidades de negócio com os games. O evento é promovido pelo Ministério das Comunicações. Veja também Siga a Bússola nas redes: Instagram | Linkedin | Twitter | Facebook | Youtube Veja também 5G: Óculos de realidade mista vão linkar mundo virtual com a realidade Para Youtubers, 5G revoluciona geração que verá vida e morte do videogame 5G: Jogos competitivos ganham de ponta a ponta com tecnologia",
        "image": "https://classic.exame.com/wp-content/uploads/2022/09/220901-Entrevista-1-sync.00_04_32_05.Still001.jpg?quality=70&strip=info&w=1024",
        "url": "https://exame.com/bussola/5g-vai-transformar-toda-a-cadeia-na-industria-de-games/",
        "score": 0,
        "categoryId": 47,
        "createdAt": "2022-09-15T20:29:48.212Z",
        "publicatedAt": "2022-09-14 20:30:59",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 256,
        "title": "Valorant: novo torneio do VCT vai acontecer em São Paulo em 2023",
        "description": "A Riot Games revelou, nesta quarta-feira (14), mais detalhes sobre o formato do Valorant Champions Tour (VCT) de 2023. O circuito começará com um evento que será sediado no Brasil e que já está sendo considerado pela empresa como o maior torneio internacional da história do Valorant. Todas as equipes selecionadas para a parceria com o VCT 2023 serão convidadas para um torneio de três semanas na cidade de São Paulo. A competição ocorrerá entre os meses de fevereiro e março, mas ainda não há uma data definida. A vencedora irá garantir uma vaga extra no Valorant Masters 2023 para sua região. O restante do calendário do VCT 2023 também foi divulgado pela Riot Games. Após o torneio em São Paulo, as equipes darão início às disputas em suas respectivas ligas profissionais, que passarão a ser separadas em Américas, EMEA (Europa, Oriente Médio e África) e Ásia-Pacífico. As ligas contarão com oito semanas de disputa e serão seguidas pelo Valorant Masters 2023, o Last Chance Qualifier e o Valorant Champions 2023. 1 de 2\rVCT 2023 começará com competição internacional sediada na cidade de São Paulo — Foto: Divulgação/Lance Skundrich/Riot Games VCT 2023 começará com competição internacional sediada na cidade de São Paulo — Foto: Divulgação/Lance Skundrich/Riot Games Um detalhe importante revelado sobre as novas ligas no VCT 2023 foram as cidades em que elas serão disputadas. A liga das Américas, que reunirá Brasil, LATAM e América do Norte em uma única competição, será realizada presencialmente em Los Angeles, Estados Unidos. A liga de EMEA terá como sede a cidade de Berlim, Alemanha. Por fim, a liga de Ásia-Pacífico vai acontecer na cidade de Seul, Coreia do Sul. Toda ação deverá começar no final do mês de março e se encerrar no mês de maio. Finalizadas as ligas, as atenções se voltarão para o Valorant Masters 2023, que deve ocorrer durante o mês de junho. As melhores equipes de cada liga jogarão o torneio internacional e aquelas que alcançarem as melhores colocações irão garantir uma ida direta para o Valorant Champions 2023, em agosto. Antes, no mês de julho, os times que não estão com vaga assegurada no mundial passarão pelo Last Chance Qualifier para tentar avançar ao último evento do ano. 2 de 2\rCalendário do VCT 2023 começa em janeiro com o circuito Challengers — Foto: Divulgação/Riot Games Calendário do VCT 2023 começa em janeiro com o circuito Challengers — Foto: Divulgação/Riot Games Em paralelo ao VCT 2023 principal, também estará ocorrendo o circuito Challenger, que contará com equipes aspirantes na busca por vagas para competir no VCT em 2024. Serão mais de 20 ligas Challenger em diversas regiões do mundo travando disputas em duas etapas. Esse circuito será finalizado com o Ascension Tournament, que colocará as melhores equipes para duelarem em um evento internacional e presencial. Confira, no vídeo abaixo, as quatro skins mais caras de Valorant: VALORANT: confira as quatro skins de arma mais caras do game",
        "image": "https://s2.glbimg.com/L67627alOGNAT_F567QZAhucQpg=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/M/M/qHBTAHQ2WFv6h6f7nw7A/52353273115-dc3f32d07e-k.jpg",
        "url": "https://www.techtudo.com.br/noticias/2022/09/valorant-novo-torneio-do-vct-vai-acontecer-em-sao-paulo-em-2023-esports.ghtml",
        "score": 0,
        "categoryId": 47,
        "createdAt": "2022-09-15T20:29:48.204Z",
        "publicatedAt": "2022-09-14 15:05:55",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 255,
        "title": "TGS 2022: veja data, horário e onde assistir ao evento",
        "description": "A Tokyo Game Show 2022, famosa TGS, já está rolando a todo vapor. O evento ocorre entre os dias 14 e 18 de setembro, e contará com diversos estúdios e publishers da indústria. O primeiro dia é marcado pelas apresentações das gigantes Microsoft, Bandai Namco e Capcom, além de outras transmissões interessantes. Nos dias seguintes, os jogadores poderão conferir as novidades de muitos nomes de peso do mundo dos games como SEGA, Square Enix e Konami. Os fãs inclusive terão a oportunidade de conferir a revelação de um título ainda não anunciado pela Konami. O que será que vem por aí? Onde assistir a TGS 2022 As apresentações da Tokyo Game Show 2022 serão transmitidas ao vivo, para o mundo inteiro, nos canais oficiais do evento em diferentes plataformas. Confira abaixo onde assistir. Programação completa da TGS 2022 14 de setembro 22h às 23h - Tokyo Game Show 2022 Opening Program 23h às 0h - Keynote 15 de setembro 0h à 1h - Gamera Games 1h às 2h - Japane Esports Union 3h às 4h - BenQ Japan 4h às 6h - Japan Game Awards 2022 6h às 7h - Microsoft 7h às 8h - Archosaur Games 8h às 9h - GREE 10h às 11h - Bandai Namco Entertainment 11h às 12h - Capcom 22h às 0h - Prime Gaming 16 de setembro 4h às 6h - Sense of Wonder Night 2022 6h às 7h - 505 Games 7h às 8h - Koei Tecmo Games 8h às 9h - SEGA / Atlus 9h às 10h - Konami 10h às 11h - Square Enix 12h às 13h - Capcom 23h às 0h - D3 Publisher 17 de setembro 0h à 1h - Donuts Games 1h às 3h - Qookka Entertainment 1h às 3h - Japan Game Awards 2022 3h às 5h - GungHo Online Entertainment 5h às 6h - Happinet 6h às 8h - miHoYo 8h às 9h - fingger 9h às 10h - LEVEL-5 10h às 11h - Aniplex 11h às 12h - ProjectMoon 22h às 0h - Online Experience Tour 22h às 0h - Japan Game Awards 2022 18 de setembro 0 à 1h - Japan Electronics College 1h às 2h - Japan Game Awards 2022 4h às 5h - GungHo Online Entertainment 5h às 6h - 110 Industries 6h às 7h - Happinet 7h às 8h - Tokyo Game Show 2022 Ending Program",
        "image": "https://www.oficinadanet.com.br/media/post/42271/1400/tgs.jpg",
        "url": "https://www.oficinadanet.com.br/games/42271-tgs-2022-onde-assistir",
        "score": 0,
        "categoryId": 47,
        "createdAt": "2022-09-15T20:29:48.193Z",
        "publicatedAt": "2022-09-15 17:15:00",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 254,
        "title": "The Captain e Spirit of the North podem ser resgatados de graça na Epic Games Store",
        "description": "A partir desta quinta-feira (15), os usuários da Epic Games Store já podem fazer o resgate de dois jogos que estão sendo oferecidos gratuitamente pela loja. Até o meio-dia do dia 22 de setembro é possível resgatar sem nenhum custo adicional o game de aventura 3D Spirit of the North e o game de exploração espacial The Captain. Desenvolvido pela Infuse Studio, Spirit of the North conta a história de uma raposa vermelha comum que se vê envolvida com a guardiã das Luzes do Norte. Inspirada na mitologia nórdica, a aventura promete uma jornada emocional e surpreendente, acompanhada por uma trilha sonora orquestrada com 14 faixas originais. Já The Captain foi criado pela Sysiac Games e coloca os jogadores no papel do Capitão Thomas Welmu, oficial da Frota Especial que se perde no outro lado da galáxia. Sabendo que forças sinistras se aproximam do Planeta Terra, ele vai ter que correr (e angariar vários aliados) para conseguir evitar que o pior aconteça. ARK e Gloomhaven são os games da próxima semana A Epic Games Store também revelou quais vão ser os dois jogos oferecidos por ela a partir do dia 22 de setembro. A partir desta data, será possível resgatar o famoso game de sobrevivência ARK: Survival Evolved (já distribuído gratuitamente pela loja no passado) e Gloomhaven, versão digital do famoso jogo de tabuleiro. Para tirar proveito das ofertas, basta ter uma conta válida na loja para PC e regatar os jogos oferecidos antes da data-limite. Este ano, a loja já deu vários títulos de orçamento variado para seus usuários, incluindo sucessos como Doom 64 e Shadow of the Tomb Raider, entre outras opções de menor destaque. A Epic Games afirma que não tem planos de diminuir a quantidade de jogos ofertados ou encerrar seu programa de distribuição gratuita. Para a empresa, quaisquer investimentos feitos nesse sentido acabam sendo compensados pelo crescimento de sua loja e pela fidelização de novos clientes. The Sims 4: jogo base será gratuito a partir do mês de outubroJogadores de PC e consoles poderão baixar o game gratuitamente .....Fonte: Fonte: Epic Games Store",
        "image": "https://adrenaline.com.br/uploads/chamadas/The_Captain_Spirit_of_the_Norte_gratuitos_Epic_Games_Store.jpg",
        "url": "https://adrenaline.com.br/noticias/v/78686/the-captain-e-spirit-of-the-north-podem-ser-resgatados-de-graca-na-epic-games-store",
        "score": 0,
        "categoryId": 47,
        "createdAt": "2022-09-15T20:29:48.186Z",
        "publicatedAt": "2022-09-15 17:45:00",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 253,
        "title": "PlayStation estará na Brasil Game Show 2022",
        "description": "God of War: Ragnarok é o principal lançamento de PlayStation para o fim do ano Foto: PlayStation / Divulgação Após muito mistério, a Sony confirmou que a marca PlayStation estará na Brasil Game Show 2022. O anúncio vem semanas depois da Microsoft informar que a Xbox não estará presente no tradicional evento de games brasileiro.No perfil da BGS no Instagram, foi revelado que a PlayStation terá o maior estande da história da feira de games, com mais de 1000 m² e que terá a maior quantidade de estações de jogo em um estande da Sony em todas as edições da Brasil Game Show.Ainda não foi divulgado o line up de PlayStation para a feira, mas os fãs esperam ver alguns dos principais jogos exclusivos da plataforma, como por exemplo, o novo God of War: Ragnarok, que chegará em novembro para PS4 e PS5.A Brasil Game Show 2022 acontece entre os dias 6 e 12 de outubro, no Expo Center Norte, em São Paulo. Os ingressos estão disponíveis no site oficial do evento. Participe do canal do Game On no Discord e fique por dentro de tudo o que vai rolar na BGS!",
        "image": "https://p2.trrsf.com/image/fget/cf/1200/630/middle/images.terra.com/2022/09/14/god-of-war-1iyhpdyvocgmr.jpg",
        "url": "https://www.terra.com.br/gameon/vida-gamer/playstation-estara-na-brasil-game-show-2022,8b9953f779202d1d80c7260ef7370bda7zpx3bo7.html",
        "score": 0,
        "categoryId": 47,
        "createdAt": "2022-09-15T20:29:48.176Z",
        "publicatedAt": "2022-09-14 19:03:53",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 252,
        "title": "LATAM Games Festival no Steam: descontos e jogos da América Latina",
        "description": "Junto com o EVA 2022 (Exposición de Videojuegos Argentina), começa uma nova edição do LATAM GAMES FESTIVAL, uma celebração no Steam de 14 a 17 de setembro que permitirá aos jogadores conhecer, experimentar e comprar com desconto mais de 150 jogos feitos por estúdios em toda a América Latina. O evento conta oficialmente com o apoio da Valve e faz parte do programa EVA 2022. Foto: steam LATAM GAMES FESTIVAL é um evento único que exibe apenas jogos latino-americanos dentro da loja internacional da Valve. Trata-se de uma ação 100% promovida pela ADVA em benefício do crescimento e maior visibilidade de toda a indústria latino-americana. É uma janela para os jogadores conhecerem em profundidade todos os projetos de videogames da região que já estão disponíveis e aqueles que virão. Os países participantes são Argentina, Brasil, Chile, Colômbia, Costa Rica, El Salvador, México, Paraguai, Peru e Uruguai, entre outros. A edição 2021 do LATAM GAMES FESTIVAL reuniu +150 mil visitas no Steam, organizada pela ADVA e lançada na já mencionada loja Valve no âmbito do EVA DIGITAL 2021. Contou com +100 jogos produzidos na região que ofereceram descontos exclusivos. Este ano o evento está indo para mais e adicionando mais jogos e mais descontos! Foto: steam Jogos brasileiros também fazem parte da seleção de games do LATAM GAMES FESTIVAL 2022 A EVA (Exposición de Videojuegos Argentina) 2022 é a 20ª edição do primeiro evento dedicado 100% ao desenvolvimento de videogames na América Latina. Será realizado de 14 a 17 de setembro, com retorno ao evento presencial na Cidade de Buenos Aires, com sede no Centro Cultural Kirchner (Sarmiento 151), e atividades no Museu de Arte Moderna de Buenos Aires (Av. San Juan 350) e no Image Campus (Salta 239). A entrada será gratuita. O formato do evento será híbrido pela primeira vez na história. O EVA é organizado pela Asociación de Desarrolladores de Videojuegos de Argentina (ADVA). O formato EVA 2022 consiste em conferências, rodadas de negócios com clínicas de pitching, feira de empregos e uma grande área de exibição de jogos de vídeo EVA Play, que exibirá principalmente jogos latinos e também da Europa. O evento encerra com o PRÊMIO EVA 2022, com prêmios em dinheiro, cortesia de Xsolla. Você pode ver mais informações sobre o evento no site oficial. Comemore, conheça e divirta-se com videogames feitos na América Latina no LATAM GAMES FESTIVAL. Você encontrará mais informações sobre o evento em sua página oficial do Steam. SOBRE A ADVA Fundada em 2004, a Asociación de Desarrolladores de Videojuegos Argentinos (ADVA) é uma organização sem fins lucrativos composta por mais de 130 estúdios e profissionais de desenvolvimento de videogames que trabalham para promover o crescimento do entretenimento digital e interativo produzido na Argentina. Para mais informações sobre a ADVA, visite: https://www.adva.vg/ SOBRE EVA EVA é a sigla que identifica o Salão argentino de Video Game (EVA). Desde 2003, a Associação de Desenvolvedores de Videogames da Argentina (ADVA) organiza o EVA ininterruptamente. É um espaço de reunião, diálogo, treinamento e desenvolvimento de negócios, com foco em videogames. Foi o primeiro evento dedicado 100% ao desenvolvimento de videogames na América Latina e é o mais importante evento de desenvolvimento de videogames da indústria local, que ano após ano cresce em público, convidados e patrocinadores. Todos os anos, a exposição é visitada por milhares de profissionais e estudantes.",
        "image": "https://img.r7.com/images/folha-vitoria-15092022105856417?dimensions=771x420&",
        "url": "https://www.folhavitoria.com.br/games/noticia/09/2022/latam-games-festival-no-steam-descontos-e-jogos-da-america-latina",
        "score": 0,
        "categoryId": 47,
        "createdAt": "2022-09-15T20:29:48.164Z",
        "publicatedAt": "2022-09-15 13:52:19",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 251,
        "title": "Portugal surfa por título mundial e vagas olímpicas em Huntington Beach",
        "description": "Portugal vai lutar pelo primeiro título mundial nos ISA World Surfing Games e pelas primeiras duas vagas para os Jogos Olímpicos Paris 2024, com seis surfistas, na praia californiana de Huntington Beach, de sexta-feira a 24 de setembro. Nas águas da Califórnia, nos Estados Unidos, estarão em ação as atletas olímpicas Yolanda Hopkins, vice-campeã mundial em 2021, e Teresa Bonvalot, bronze no ano passado, acompanhadas, no feminino, por Francisca Veselko. No masculino, que em 2021 rendeu uma medalha de bronze, os convocados pelo selecionador David Raimundo são Frederico Morais, que falhou Tóquio2020 devido à covid-19, Guilherme Ribeiro e Guilherme Fonseca. 'Portugal tem-se vindo a afirmar a nível de seleções, nos últimos anos, como uma das grandes potências. Fomos três vezes vice-campeões do mundo, no ano passado terceiros em El Salvador. Como é óbvio, Portugal tem sempre aspirações de lutar pelos títulos, chegar às fases finais de competições. Neste caso, em ciclo olímpico, vamos tentar, em masculinos e femininos, garantir uma primeira vaga para Portugal', resume o selecionador, em entrevista à Lusa. A prova qualificará um atleta do país que vencer o título mundial masculino e feminino, e não quem vencer a título individual, no arranque da qualificação para Paris2024, que terá as competições de surf em Teahuppo, na ilha do Taiti, na Polinésia Francesa. Sempre 'com o objetivo de lutar pela qualificação', 2022 é 'o ano mais difícil', com 'as grandes potências do surf mundial representadas ao mais alto nível'. Para se bater com eles, Portugal terá 'surfistas com qualidade e experiência, que têm mostrado nos World Surfing Games que podem ganhar a qualquer atleta'. A ambição de chegar ao título mundial vem de trás, e essa 'ambição de vencer' mantém-se nos Estados Unidos, aliada à presença de atletas que, mais do que a título individual, aqui competem 'por um objetivo global, a lutar por dignificar a bandeira'. 'Quando começámos o ciclo olímpico anterior, toda a gente se riu porque eu disse que íamos lutar pelas quatro vagas, o máximo possível. Conseguimos três', lembra o selecionador. Para Paris2024, podem qualificar-se, por um país, até um máximo de seis atletas este ano, o que será 'uma tarefa muito, muito difícil', mas que 'enquanto for possível' será o objetivo. 'Com a qualidade dos nossos atletas, que têm demonstrado, temos todas as possibilidades de lutar de igual para igual com todas as outras seleções. No que for a parte que podemos controlar, ao nível da preparação, estratégia, vontade, vamos ser das seleções mais bem preparadas para lutar por esse objetivo', reforça o técnico. Entre o quadro principal e as repescagens, para quem perde numa ‘heat', mas ainda tem chance de tentar chegar ao título, estes torneios da ISA podem tornar-se 'muito desgastantes', ainda para mais 'na onda mais difícil de competir a nível mundial', em Huntington Beach. Em 2022 e 2024, as equipas vencedoras dos World Surfing Games podem qualificar um atleta de cada género, e em 2023, os melhores classificados de cada continente (Europa, África, Ásia e Oceania) conquistam uma vaga por género, enquanto a vaga do continente americano será atribuída nos Jogos Pan-americanos. Em 2024, qualificam-se os cinco melhores masculinos e sete femininos dos World Surfing Games, aos quais se juntarão dois representantes para França, enquanto país organizador e uma vaga \"universal\" para o Comité Olímpico Internacional. Existem ainda as vagas pela via da World Surf League, através do World Tour, no qual Portugal não tem, este ano, qualquer representante.",
        "image": "https://images.rr.sapo.pt/3399915420098120addd_socialshare.JPG",
        "url": "https://rr.sapo.pt/bola-branca/noticia/modalidades/2022/09/14/portugal-surfa-por-titulo-mundial-e-vagas-olimpicas-em-huntington-beach/299674/",
        "score": 0,
        "categoryId": 47,
        "createdAt": "2022-09-15T20:29:48.156Z",
        "publicatedAt": "2022-09-14 09:38:16",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 250,
        "title": "VALORANT: Novo VCT é anunciado com torneio internacional no Brasil",
        "description": "A Riot Games revelou novos detalhes de como será o VALORANT Champions Tour 2023 (VCT 2023). A nova temporada será dotada de torneios com equipes parceiras da publisher e também times que correrão por fora, em busca de vagas internacionais. Ao mesmo tempo, foi anunciado que \"o maior torneio de VALORANT da história\" acontecerá em São Paulo, no Brasil, já no início da temporada. LEIA MAIS: Como mencionado anteriormente, em 2023 o VALORANT já começa com uma competição gigante, a qual terá lugar em São Paulo. O torneio inaugural começa em fevereiro, possui duração de três semanas e conta com a presença de todos os times parceiros da Riot Games. Em março será coroado o grande campeão, o qual garante à liga em que joga, uma vaga extra para o próximo evento internacional da temporada, o Masters. Em seguida, começarão as temporadas regionais Américas, EMEA e APAC, com disputas presenciais semana após semana. Os locais escolhidos para os confrontos foram Los Angeles (Estados Unidos), Berlim (Alemanha) e Seul (Coreia do Sul) - todos com cobertura presencial em vários idiomas. Esta mesma etapa tem início em março e dura oito semanas, quando em maio o público conhecerá os campeões de cada liga. As temporadas seguintes terão duas etapas da liga. Porém, 2023 terá apenas uma, pensando em dar maior tempo aos times para se estabelecerem neste novo formato. \"A paixão da comunidade de VALORANT nos inspirou a sonhar alto, evoluir o VALORANT Champions Tour e atender à demanda que estamos vendo em todos os cantos do mundo\", afirmou Whalen Rozelle, Líder de Operações de Esports da Riot Games. \"Em 2023, usaremos tudo que aprendemos, acrescentando algumas ideias novas e formando parcerias que nos ajudarão a realizar nossos sonhos para a próxima edição do VCT.\" Imagem: Riot Games/Reprodução O Masters, segundo torneio internacional do ano, voltará em junho com as melhores equipes de todas as ligas. Esse evento dará às melhores equipes de cada território uma classificação direta para o Champions, que ainda permanece como o mundial de VALORANT. Em Julho acontece o retorno das Qualificatórias Finais, em que as melhores equipes ainda não qualificadas para o Champions terão uma última chance de obter uma vaga para o evento mais importante da temporada. Serão três Last Chance Qualifiers (LCQ), os quais enviarão uma equipe cada para o Champions. A temporada do VCT terminará com o Champions em agosto. Ao mesmo tempo em que todas essas competições com equipes parceiras da Riot Games se desenrolam, ocorrem também os campeonatos com os times não-parceiros, mas que também podem chegar aos maiores torneios internacionais do VALORANT, em 2024. Estamos preparando algo fresquinho para 2023 👀Com três ligas de altíssimo nível e torneios dentro do jogo, prepare-se para um #VCT totalmente novo! pic.twitter.com/jRKWFIqFy8— VALORANT Champions Tour Brazil (@valesports_br) September 14, 2022 Para essas equipes, a disputa foi dividada em três: Challengers 1, Challengers 2 e Ascension. Veja o calendário completo abaixo: Imagem: Riot Games/Reprodução Diversas informações já foram divulgadas pela Riot Games, mas ainda faltam algumas bem importantes, como por exemplo quais serão as equipes participantes, as escalações de cada uma delas e mais. No entanto, fato é que cada vez mais o novo formato do VCT toma forma na cabeça do público, que ainda o conhecerá melhor em 2023.",
        "image": "https://cdn.ome.lt/kyaAI4t3leqsHClHt-aHLMToa1g=/1200x630/smart/extras/conteudos/Novo_VCT.jpg",
        "url": "https://www.theenemy.com.br/esports/valorant-novo-vct-e-anunciado-com-torneio-internacional-no-brasil",
        "score": 0,
        "categoryId": 47,
        "createdAt": "2022-09-15T20:29:48.146Z",
        "publicatedAt": "2022-09-14 15:01:19",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 249,
        "title": "Os 10 jogos mais baixados para PS4 e PS5 em agosto de 2022",
        "description": "Já estamos em setembro, e esta pode ser uma boa hora para conferir os 10 jogos mais baixados para PlayStation 4 e PlayStation 5 em agosto de 2022. A grande surpresa fica por conta de Cult of the Lamb, jogo indie da Massive Monster e Devolver Digital que ficou em terceiro lugar no ranking. O game mistura ação em rogue-like com gerenciamento de comunidade. Você controla um carneirinho que, após ser sacrificado em um ritual, é ressuscitado por uma entidade demoníaca sob uma condição: se tornar o líder de um culto e libertar seu mestre. Apesar da descrição um tanto macabra, o título conta com visuais e trilha sonora fofos e simpáticos. Porém, o primeiro lugar no ranking de PS5 ficou com outro game: Grand Theft Auto V (GTA 5), para a surpresa de zero pessoas. Em segundo lugar está FIFA 22. Já no PS4, os games apenas inverteram as posições. Confira as listas completas dos jogos mais baixados no PS5 e PS4 em agosto de 2022. Jogos mais baixados de PS5 em agosto GTA V retorna ao topo do pódio (Foto: Divulgação/Rockstar Games) Grand Theft Auto V FIFA 22 Cult of the Lamb Gran Turismo 7 Horizon Forbidden West FAR CRY 6 Mortal Kombat 11 F1 22 Alan Wake Remastered Thymesia Saints Row 5 Resident Evil 3 Stray ELDEN RING Star Wars Jedi: Fallen Order Marvel's Spider-Man: Miles Morales Cyberpunk 2077 F1 Manager 2022 HOT WHEELS UNLEASHED Among Us Jogos mais baixados de PS4 em agosto Mesmo com FIFA 23 chegadno em 27 de setembro, vendas do FIFA 22 continuam altas (Foto: Divulgação/EA) FIFA 22 Grand Theft Auto V Minecraft The Last of Us Part II Call of Duty: Modern Warfare Mortal Kombat X Street Fighter V Batman: Arkham Knight CUPHEAD The Witcher 3: Wild Hunt The Sims 4 Outlast Dragon Ball Z: Kakarot Dying Light God of War III Remastered Dark Souls III Outlast 2 Naruto Shippuden: Ultimate Ninja Storm 4 Injustice 2 Need for Speed Jogos mais baixados de PS VR em agosto Em ASTRO BOT Rescue Mission, precisamos resgatar os Bots que estão espalhados pelo espaço (Foto: Divulgação/Sony Interactive Entertainment) Astro Bot Rescue Mission Beat Saber DOOM 3 VR Job Simulator Arizona Sunshine Coaster DiRT Rally Batman: Arkham VR PlayStation VR Worlds Dead Land VR Jogos gratuitos mais baixados em agosto MultiVersus é um jogo de luta à la Super Smash Bros., mas com personagens da Warner Bros. (Foto: Divulgação/Warner Bros. Games) MultiVersus Rumbleverse Fortnite Fall Guys eFootball 2022 Call of Duty: Warzone Apex Legends Genshin Impact Rocket League Destiny 2 Continue lendo Fonte: Canaltech Trending no Canaltech:",
        "image": "https://s.yimg.com/ny/api/res/1.2/Nmysj_s5fv0FoXxIldEq5A--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02NzU-/https://media.zenfs.com/en/canal_tech_990/5d6a7edead7fa0b54774c4f8d490d1a6",
        "url": "https://br.financas.yahoo.com/noticias/os-10-jogos-mais-baixados-113000709.html",
        "score": 0,
        "categoryId": 47,
        "createdAt": "2022-09-15T20:29:48.140Z",
        "publicatedAt": "2022-09-14 11:30:00",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      }
    ],
    "ciencias": [
      {
        "id": 128,
        "title": "A soberania do veredicto absolutório no Tribunal do Júri e a (im)possibilidade recursal",
        "description": "O veredicto dos jurados é uma decisão judicial e política, emanada por aquele que detém constitucionalmente o status de soberano: o povo. Esta é uma das razões pelas quais praticamente em todos os lugares, o veredicto do júri é uma decisão irrecorrível.Com base nesta consideração, o recurso pode ser analisado por duas vertentes. A primeira, a impugnação de vícios ou violações de preceitos estabelecidos na Constituição e outra, inaceitável, quando o objetivo é impugnar as razões de fato que levaram os juízes leigos a ditar tal veredicto [1].Aqui entramos em uma zona de alta tensão e intenso debate entre juristas, do qual o julgamento da matéria pela possibilidade ou não de impugnar um veredicto absolutório será apreciado pela Supremo Tribunal Federal no ARE 1225185, cuja sessão está prevista para ocorrer no dia 25 de agosto.Antes de apontarmos as razões pelas quais tal veredicto não deve ser objeto de recurso, convidamos o leitor a uma breve reflexão: é fato que tanto nos países de civil law como nos de common law, desde a época da Roma Antiga é reconhecida a regra que impede a persecução múltipla. Na common law, inclusive, os acusadores não possuem a possibilidade de recorrer de decisões absolutórias por parte dos jurqados. Em Green v. United States (1957), um importante leading case, destacou-se que \"assim, é um dos princípios elementares de nossa lei penal, pois o Go\u00adverno não pode promover um novo julgamento por meio de um recurso, mes\u00admo que a absolvição possa parecer errada\" [2].A partir disso, por que no Brasil consolidou a ideia de viabilizar o recurso em casos de decisões absolutórias? Considerando a grande vantagem procedimental e de estrutura da acusação, uma absolvição não significa que o acusado precisa ter esta decisão reconhecida? A soberania do júri, como uma garantia constitucional, não se materializa com este tipo de decisão?Nos Estados verdadeiramente democráticos, o veredicto dos representantes da sociedade impede eventuais recursos que visam rediscutir o mérito da decisão absolutória, eis que esta regra está \"embasada em uma determinação de valor fundamental de nossa sociedade de que é muito pior condenar um inocente do que deixar um culpado em liberdade\" [3]. Aliás, a dignidade e liberdade da pessoa humana deve prevalecer sobre o direito de punir.Adentrando na questão diretamente pelo âmbito das cortes superiores, o ministro Rogério Schietti Cruz do STJ, em um de seus votos destaca que, ao menos em relação à absolvição do acusado, a decisão dos jurados é soberana e não pode ser revisada pelos juízes através de recursos da acusação [4]. Na mesma linha, o ministro do STF, Celso de Mello, faz um destacado apontamento sobre a soberania do veredicto absolutório do júri, mesmo quando o jurado absolve pelo quesito genérico:\"[...] entendo assistir plena razão à parte impetrante, no ponto em que sustenta, corretamente, com base no art. 483, III e respectivo § 2º, do Código de Processo Penal, na redação dada pela Lei no 11.689/2008, que não mais se revela viável a utilização, pelo órgão da acusação, do re\u00adcurso de apelação (CPP, art. 593, III, 'd') como meio de impugnação às decisões absolutórias proferidas pelo Tribunal do Júri com apoio na resposta dada pelo Conselho de Sentença ao quesito genérico de ab\u00adsolvição penal (CPP, art. 483, III, e respectivo § 2º)\" [5].Por este raciocínio, nas palavras de Julio Maier aprendemos que \"[...] o julgamento público ante jurados e a concepção de recursos do acusado contra condenação como garantia processual penal impede conceder à acusação mais de uma oportunidade para perseguir penal\u00admente até conseguir a condenação, pois a decisão de condenar é tarefa dos jurados. [...] o veredicto absolutório do júri impede a utilização dessa fer\u00adramenta, qualquer que seja a valoração do veredicto (justo ou injusto perante a lei)\" [6].Em artigos anteriores nesta coluna, houve o destaque do sistema de júri argentino [7], apontando a normativa processual daquele país. De acordo com Andrés Harfuch et al., a proibição do recurso do ministério público ou assistente de acusação contra uma decisão absolutória foi estabelecida na Argentina em dois casos fundamentais: Alvarado (1998) e Sandoval (2010). Tal proibição vale tanto para decisões que provenham de juiz técnico ou de um jurado popular, pois ambas violariam a garantia ne bis in idem [8].A Corte IDH no caso Roche Azaña vs. Nicaragua (2020) [9] responsabilizou aquele Estado por considerar a violação aos direitos às garantias judiciais e à proteção judicial da família Roche Azaña, por não terem sido informados da existência do processo penal contra os acusados, impossibilitando-os de participar e ter acesso às diversas etapas. Mesmo assim, foi mantida a absolvição dos réus, de acordo com o que dispõe os tratados direito humanos e outros julgados da Corte IDH [10]. Contrariamente ao que alguns ventilam, isso não é autorizar uma absolvição arbitrária, mas, sim, indicar o que está claro nos pactos internacionais e entender o conceito de soberania dos veredictos. Se os jurados absolvem, o fazem por algum motivo, e essa valoração deve estar devidamente identificada através do seu instrumento decisório: os quesitos.A regra que prevalece quase que universalmente é que o veredicto absolutório em um caso penal é final e conclusivo e, portanto, não pode ser celebrado um novo julgamento [11]. O Brasil, diferentemente do que previsto em diversos outros países cuja legislação é fonte de inspiração, insiste na discussão sobre a viabilidade ou não desse recurso. Para se ter um fair trial, a acusação não pode recorrer ante um veredicto absolutório, tentando distorcer ou ignorar o que estipulam claramente os pactos internacionais, a Corte IDH e legislações de diversos países.Para além da questão da adequação do nosso sistema aos tratados internacionais e, trazendo para a realidade brasileira, onde ainda se permite recorrer de algumas decisões absolutórias do júri, a questão também deve ser analisada sob outro aspecto: a tipicidade processual através das hipóteses cabíveis do recurso contra a decisão proferida no julgamento pelo júri. A relação de tipicidade processual e de proteção faz referência à \"tarefa de aplicar o direito às situações concretas não realizadas aleatoriamente pelos órgãos estatais; ao contrário, a atividade processual também é regulada pelo ordenamento jurídico, através de formas que devem ser obedecidas pelos que nela intervêm. Nesse sentido, afirma-se que o processo exige uma atividade típica, composta de atos cujos traços essenciais são definidos pelo legislador. Assim, os participantes da relação processual devem pautar o seu comportamento segundo o modelo legal, sem o que essa atividade correria o risco de perder-se em providências inúteis ou desviadas do objetivo maior, que é a preparação de um provimento final justo\" [12].Em uma rápida leitura das quatro alíneas do artigo 593, III, CPP há clara identificação do cabimento recursal, não havendo espaço para a interpretação extensiva para prejudicar o acusado e inverter a ordem constitucional da soberania. Na primeira alínea o debate se refere à nulidade ocorrida em plenário; na segunda, à decisão do juiz presidente que contraria a decisão do Conselho de Sentença; na terceira o endereçamento quanto a aplicação da pena ou medida de segurança e, apenas na última alínea, o aspecto decisório que contrarie o quadro probatório produzido em plenário. Para a reflexão em questão, devemos nos manter na última alínea: quando a decisão dos jurados for manifestamente contrária à prova dos autos. É a partir desse destaque que conseguimos individualizar o debate processual. Para exemplificar: na hipótese de absolvição do acusado pelo segundo quesito referente a autoria/coautoria/participação seria possível a acusação manejar — normativamente — o recurso de apelação, na medida em que se torna cabível identificar se os jurados valoraram corretamente a prova ou se a sua decisão se mostrou completamente dissociada do quadro probatório. Repita-se: ultrapassada a adequação do sistema brasileiro aos tratados internacionais, nossa norma processual indica ser cabível o recurso acusatório diante de uma decisão absolutória. Há, pela previsão expressa (593, III, d, CPP), cabimento recursal.A questão toma rumos mais complexos quando o enfrentamento diz respeito ao quesito genérico. Dois pontos devem ser observados: 1º) se a decisão absolutória foi produzida a partir da discussão sobre o arcabouço probatório;2º) se os jurados absolveram o acusado sem se pautarem em suporte probatório. Explicamos:Na primeira hipótese, a tese defensiva está estruturada em uma discussão fática-probatória que condiciona a sua sustentação. Por exemplo, a defesa sustenta a tese de legítima defesa e indica as provas produzidas para este fim. Na concordância com a defesa os jurados absolvem o acusado e, teoricamente, seria possível a impugnação acusatória por eventual decisão manifestamente contrária à prova dos autos. A discussão aqui seguiria em outro rumo: não pelo cabimento do recurso e sim se a opção dos jurados por uma das teses possui baliza probatória mínima e, se possuir, a soberania deve ser respeitada. Vejam que aqui o debate não se resume ao cabimento recursal pela acusação, mas o confronto entre o mérito recursal e a soberania dos jurados a partir da concordância com uma tese exposta pela defesa em plenário. Mas poderia ser questionado: como conseguimos individualizar a exposição dessa questão? A resposta surge com grau de simplicidade: através do registro em plenário. Deve ser ressaltado que a ata de julgamento serve como guia de enfrentamento das teses e, portanto, deve estar registrado que a defesa (autodefesa e/ou defesa técnica) apenas sustentou a referida tese (legítima defesa).A segunda questão segue em linha diametralmente oposta. Se o Conselho de Sentença absolve em virtude de uma clemência ou uma decisão humanitária, seja pelo pleito defensivo seja por autonomia decisória (e deve estar também expresso na ata o registro da tese defensiva), daí não há possibilidade recursal tão somente em virtude de previsão legal. Explicando e exemplificando melhor com casos concretos:1º) imaginemos que a defesa sustente ausência de provas quanto a autoria, mas ainda que haja a resposta positiva ao segundo quesito (autoria), os jurados absolvem o acusado no quesito genérico. Neste exemplo, houve autonomia decisória do Conselho de Sentença pois não se baseou na sustentação defensiva e muito menos no contexto probatório. O que se identifica neste ponto é a efetivação decisória alheia ao quadro probatório e, portanto, a caracterização da soberania dos jurados.2º) a defesa sustenta a clemência e os jurados, no mesmo sentido, absolvem o acusado através do quesito genérico.Para as duas hipóteses anteriores surge a o cerne da reflexão: seria possível recurso pela acusação? A resposta é simples: não, em virtude da ausência de previsão legal.Rememoremos o artigo 593, III, d, CPP: cabe recurso de apelação quando a decisão dos jurados for manifestamente contrária à prova dos autos. Mas qual é o quadro probatório que estamos enfrentando? Nenhum! Os jurados absolveram por entenderem que no julgamento em questão não é cabível a condenação. Não há como sopesar valor probatório porque não está em debate elementos de prova. Não há como o tribunal revisional aferir se a decisão dos jurados fora manifestamente contrária à prova se estes não julgaram pelas provas e sim ditando a sua soberania fixada em grau constitucional. Portanto, é chegada à hora de colocarmos os pingos nos \"is\" e fixarmos o valor da soberania dos veredictos em contato direto com o princípio da tipicidade processual. Logo, a relação entre a decisão justa e as condições para o seu efetivo exercício está condicionada à legalidade do processo penal [13], o que reforça a ideia da caracterização da tipicidade processual como elemento de proteção e legitimidade do próprio desenvolvimento político e jurisdicional do ato processual [14]. A conclusão segue pela simplicidade da expressão: caso haja absolvição no quesito genérico e obrigatório, sem que ocorra o enfrentamento sobre o quadro probatório pelo juiz natural (jurados), incabível o recurso pela acusação em virtude da simples ausência de previsão legal e do reconhecimento constitucional da soberania dos veredictos.  [1] GRANILLO FERNÁNDEZ, Héctor. Juicio por Jurados. Ed. Rubinzal-Culzoni. Bs. As. 2013, p. 101/2.[2] U.S. Supreme Court - Green v. United States, 355 U.S. 184 (1957).[3] Trecho mencionado diversas vezes em Patterson v. New York, 432 U.S. 197 (1977)[4] STJ - REsp 1.677.866/MG - rel. Rogerio Schietti Cruz - j. 7/5/2019.[5] STF - HC 178.856 - rel. Celso De Mello – 2ª Turma - j. 10/10/2020.[6] MAIER, Julio. La impugnación del acusador: ¿un caso de ne bis in idem? Ciencias Penales. Revista de la Asociación de Ciencia. Nº 12 (1996) p. 10-15[8] HARFUCH, Andrés; DEANE, Matías M.; CASCIO, Alejandro; PENNA, Cristian D. La garantía del ne bis in idem y la prohibición del recurso del acusador público o privado contra la sentencia absolutoria. LA LEY, Suplemento Penal y Procesal Penal, n.º 5, Agosto 2020.[10] Na mesma linha, Corte IDH. Caso J. vs. Perú. Excepción Preliminar, Fondo, Reparaciones y Costas. Sentencia de 27 de noviembre de 2013[11] People v. Coming, 2 N. Y. 9; 49 Am. Dec. 364, and note; 48 Am. St. Rep. 213, 214[13] NEVES, António Castanheira. Sumários de Processo Criminal. Coimbra: João Abrantes, 1968, p. 23.Denis Sampaio é defensor público, titular do 2º Tribunal do Júri do Rio de Janeiro, doutor em Ciências Jurídico-Criminais pela Faculdade de Lisboa (Portugal), mestre em Ciências Criminais pela Ucam-RJ, investigador do Centro de Investigação em Direito Penal e Ciências Criminais da Faculdade de Lisboa, membro Honorário do Instituto dos Advogados Brasileiros e professor de Processo Penal.Revista Consultor Jurídico, 20 de agosto de 2022, 8h00",
        "image": "https://s.conjur.com.br/img/b/denis-sampaio-tarja1.jpeg",
        "url": "https://www.conjur.com.br/2022-ago-20/tribunal-juri-soberania-veredicto-absolutorio-impossibilidade-recursal",
        "score": 0,
        "categoryId": 44,
        "createdAt": "2022-08-21T01:37:24.294Z",
        "publicatedAt": "2022-08-20 11:00:00",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      }
    ],
    "finanças": [
      {
        "id": 158,
        "title": "IGF analisa nomeação de Sérgio Figueiredo para as Finanças",
        "description": "Fernando Medina continua na mira da oposição por ter nomeado Sérgio Figueiredo como consultor do Ministério das FinançasFoto: Fernando Veludo/Lusa20 Agosto 2022IGF analisa nomeação de Sérgio Figueiredo para as Finanças Hermana CruzHoje às 20:23A Inspeção-Geral das Finanças (IGF) vai analisar a denúncia efetuada pelo Chega sobre a \"eventual troca de favores\" na nomeação de Sérgio Figueiredo para consultor do Ministério das Finanças. Um caso que fez o partido de André Ventura exigir que a Câmara de Lisboa divulgue todos os contratos celebrados com o ex-diretor da TVI. E que levou a Iniciativa Liberal (IL) a repudiar \"o padrão de uso e abuso do aparelho do Estado\" dos socialistas.\"O Chega foi ontem (anteontem) notificado pela Inspeção Geral de Finanças, de que está em análise e já com processo aberto, a denúncia feita pelo Chega sobre a eventual troca de favores entre Medina e Sérgio Figueiredo\", revelou o partido de Ventura, em comunicado, no dia em que foi tornado público um contrato de 350 mil euros, celebrado no último mandato de Fernando Medina, entre a Câmara de Lisboa e o filho de Sérgio Figueiredo.Caso Sérgio Figueiredo. Paulo Rangel: \"Temos tiques de absolutismo que são inaceitáveis\"Polémica Sérgio Figueiredo. Oposição não encerra caso e continua a exigir explicações de MedinaFinanças. Medina lamenta \"profundamente\" decisão de Sérgio Figueiredo",
        "image": "https://static.globalnoticias.pt/jn/image.jpg?brand=JN&type=generate&guid=b7bee075-b526-45ae-adcb-862c48227566&w=800&h=420&watermark=true&t=20220820202300",
        "url": "https://www.jn.pt/nacional/igf-analisa-nomeacao-de-sergio-figueiredo-para-as-financas-15104583.html",
        "score": 0,
        "categoryId": 46,
        "createdAt": "2022-08-21T15:43:13.139Z",
        "publicatedAt": "2022-08-20 20:23:00",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 157,
        "title": "Chega e IL querem mais esclarecimentos das ligações de Medina e Sérgio Figueiredo",
        "description": "tiago miranda O Chega e a Iniciativa Liberal (IL) exigiram este sábado mais explicações ao ministro das Finanças sobre as ligações entre Fernando Medina e Sérgio Figueiredo, ex-diretor de informação que renunciou ao cargo de consultor das Finanças. O partido Chega, em comunicado, pediu mais esclarecimentos sobre este caso e solicitou à câmara de Lisboa, à qual Medina presidiu antes de ir para o Governo, que 'torne públicos todos os contratos existentes ou que existiram', assim como avenças de prestação de serviços, entre o município e 'Sérgio Figueiredo ou familiares, ou empresas de que estes sejam titulares ou proprietários de facto'. Este pedido surge depois de o semanário \"Novo\" ter noticiado que a Câmara Municipal de Lisboa, liderada por Fernando Medina, atribuiu um apoio de 350 mil euros a um evento organizado pelo filho de Sérgio Figueiredo, na altura diretor da TVI, de que o canal foi 'media partner'. O Chega já tinha apresentado uma denúncia à Inspeção-Geral de Finanças (IGF) sobre \"a eventual troca de favores entre Medina e Sérgio Figueiredo\". Sérgio Figueiredo, antigo diretor de informação da TVI, renunciou em 17 de agosto ao cargo de consultor do ministro das Finanças, comunicando a decisão através de um texto publicado no \"Jornal de Negócios\", após semanas de polémica e críticas de partidos políticos e comentadores. O jornal \"Público\" noticiou em 9 de agosto que o Ministério das Finanças tinha contratado o antigo diretor de informação da TVI e ex-administrador da Fundação EDP Sérgio Figueiredo como consultor estratégico para fazer a avaliação e monitorização do impacto das políticas públicas, escolha que motivou críticas de partidos políticos e comentadores. Hoje, o Chega afirmou ser 'importante que toda a verdade deste emaranhado estranho de relações seja definido e clarificado, em nome da transparência e da integridade do exercício de funções públicas'. Já a Iniciativa Liberal, também em comunicado, considerou que as notícias dos últimos dias 'adicionam factos que comprovam a existência de uma teia de relações construída' entre Fernando Medina e Sérgio Figueiredo, 'tornando absolutamente evidente a forma despudorada como se usa e abusa do dinheiro dos contribuintes'.",
        "image": "https://images.impresa.pt/expresso/2022-07-20-Debate-Estado-da-Nacao-88401572/1.91x1?wm=true&outputFormat=jpeg",
        "url": "https://expresso.pt/politica/2022-08-20-Chega-e-IL-querem-mais-esclarecimentos-das-ligacoes-de-Medina-e-Sergio-Figueiredo-b56aa4ac",
        "score": 0,
        "categoryId": 46,
        "createdAt": "2022-08-21T15:43:13.126Z",
        "publicatedAt": "2022-08-20 17:28:00",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 156,
        "title": "Chega e IL querem mais esclarecimentos das ligações de Medina e Sérgio Figueiredo",
        "description": "O Chega e a Iniciativa Liberal (IL) exigiram hoje mais explicações ao ministro das Finanças sobre as ligações entre Fernando Medina e Sérgio Figueiredo, ex-diretor de informação que renunciou ao cargo de consultor das Finanças. O partido Chega, em comunicado, pediu hoje mais esclarecimentos sobre este caso e solicitou à câmara de Lisboa, que Medina presidiu antes de ir para o Governo, que \"torne públicos todos os contratos existentes ou que existiram\", assim como avenças de prestação de serviços, entre o município e \"Sérgio Figueiredo ou familiares, ou empresas de que estes sejam titulares ou proprietários de facto\". Este pedido surge depois de o semanário Novo ter noticiado que a Câmara Municipal de Lisboa, liderada por Fernando Medina, atribuiu um apoio de 350 mil euros a um evento organizado pelo filho de Sérgio Figueiredo, na altura diretor da TVI, de que o canal foi \"media partner\". O Chega já tinha apresentado uma denúncia à Inspeção-Geral de Finanças (IGF) sobre \"a eventual troca de favores entre Medina e Sérgio Figueiredo\". Sérgio Figueiredo, antigo diretor de informação da TVI, renunciou em 17 de agosto ao cargo de consultor do ministro das Finanças, comunicando a decisão através de um texto publicado no Jornal de Negócios, após semanas de polémica e críticas de partidos políticos e comentadores. O jornal Público noticiou em 09 de agosto que o Ministério das Finanças tinha contratado o antigo diretor de informação da TVI e ex-administrador da Fundação EDP Sérgio Figueiredo como consultor estratégico para fazer a avaliação e monitorização do impacto das políticas públicas, escolha que motivou críticas de partidos políticos e comentadores. Hoje, o Chega afirmou ser \"importante que toda a verdade deste emaranhado estranho de relações seja definido e clarificado, em nome da transparência e da integridade do exercício de funções públicas\". Já a Iniciativa Liberal, também em comunicado, considerou que as notícias dos últimos dias \"adicionam factos que comprovam a existência de uma teia de relações construída\" entre Fernando Medina e Sérgio Figueiredo, \"tornando absolutamente evidente a forma despudorada como se usa e abusa do dinheiro dos contribuintes\".",
        "image": "https://cdn.jornaldenegocios.pt/images/2022-08/img_1200x676$2022_08_10_21_14_14_434009.jpg",
        "url": "https://www.jornaldenegocios.pt/economia/politica/detalhe/20220820-1833-chega-e-il-querem-mais-esclarecimentos-das-ligacoes-de-medina-e-sergio-figueiredo",
        "score": 0,
        "categoryId": 46,
        "createdAt": "2022-08-21T15:43:13.119Z",
        "publicatedAt": "2022-08-20 17:39:49",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 155,
        "title": "Como está sua saúde financeira? Faça o teste e descubra",
        "description": "Endividado, equilibrado financeiramente ou possível investidor? Você sabe em qual categoria você se encontra quando o assunto é finanças? A Provu, fintech de meio de pagamento e crédito pessoal, preparou um teste para você saber como anda sua saúde financeira.Saúde financeira não engloba apenas quem ganha muito ou pouco dinheiro. Ela diz respeito aos hábitos e comportamentos com os quais lidamos com o dinheiro, e serve para todas as pessoas, já que o controle financeiro deve ser adaptado à realidade e às possibilidades de cada um. Ter equilíbrio nas finanças significa adequar suas despesas e metas de vida com sua renda atual, independentemente de quanto ela seja.  Faça o teste e descubra seu nível de saúde financeira:",
        "image": "https://img.r7.com/images/milionario-financas-dinheiro-riqueza-19082022150420862?dimensions=1000x667",
        "url": "https://noticias.r7.com/prisma/o-que-e-que-eu-faco-sophia/fotos/como-esta-sua-saude-financeira-faca-o-teste-e-descubra-21082022",
        "score": 0,
        "categoryId": 46,
        "createdAt": "2022-08-21T15:43:13.111Z",
        "publicatedAt": "2022-08-21 05:00:20",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 154,
        "title": "Chega e IL querem mais esclarecimentos das ligações de Medina e Sérgio Figueiredo",
        "description": "O Chega e a Iniciativa Liberal (IL) exigiram este sábado mais explicações ao ministro das Finanças sobre as ligações entre Fernando Medina e Sérgio Figueiredo, ex-diretor de informação que renunciou ao cargo de consultor das Finanças.O partido Chega, em comunicado, pediu mais esclarecimentos sobre este caso e solicitou à câmara de Lisboa, que Medina presidiu antes de ir para o Governo, que 'torne públicos todos os contratos existentes ou que existiram', assim como avenças de prestação de serviços, entre o município e 'Sérgio Figueiredo ou familiares, ou empresas de que estes sejam titulares ou proprietários de facto'.Este pedido surge depois de o semanário Novo ter noticiado que a Câmara Municipal de Lisboa, liderada por Fernando Medina, atribuiu um apoio de 350 mil euros a um evento organizado pelo filho de Sérgio Figueiredo, na altura diretor da TVI, de que o canal foi 'media partner'.O Chega já tinha apresentado uma denúncia à Inspeção-Geral de Finanças (IGF) sobre 'a eventual troca de favores entre Medina e Sérgio Figueiredo'. PUB • CONTINUE A LER A SEGUIR Sérgio Figueiredo, antigo diretor de informação da TVI, renunciou em 17 de agosto ao cargo de consultor do ministro das Finanças, comunicando a decisão através de um texto publicado no Jornal de Negócios, após semanas de polémica e críticas de partidos políticos e comentadores.O jornal Público noticiou em 9 de agosto que o Ministério das Finanças tinha contratado o antigo diretor de informação da TVI e ex-administrador da Fundação EDP Sérgio Figueiredo como consultor estratégico para fazer a avaliação e monitorização do impacto das políticas públicas, escolha que motivou críticas de partidos políticos e comentadores.O Chega afirmou ser 'importante que toda a verdade deste emaranhado estranho de relações seja definido e clarificado, em nome da transparência e da integridade do exercício de funções públicas'.Já a Iniciativa Liberal, também em comunicado, considerou que as notícias dos últimos dias 'adicionam factos que comprovam a existência de uma teia de relações construída' entre Fernando Medina e Sérgio Figueiredo, 'tornando absolutamente evidente a forma despudorada como se usa e abusa do dinheiro dos contribuintes'. Leia também: Leia também: Leia também: Leia também:",
        "image": "https://wm.observador.pt/wm/obs/l/https%3A%2F%2Fbordalo.observador.pt%2Fv2%2Frs%3Afill%3A770%3A403%2Fc%3A2000%3A1126%3Anowe%3A0%3A207%2Fq%3A85%2Fplain%2Fhttps%3A%2F%2Fs3.observador.pt%2Fwp-content%2Fuploads%2F2022%2F07%2F14162404%2F38974255.jpg",
        "url": "https://observador.pt/2022/08/20/chega-e-il-querem-mais-esclarecimentos-das-ligacoes-de-medina-e-sergio-figueiredo/",
        "score": 0,
        "categoryId": 46,
        "createdAt": "2022-08-21T15:43:13.106Z",
        "publicatedAt": "2022-08-20 18:25:01",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 153,
        "title": "Chega e IL querem mais esclarecimentos das ligações de Medina e Sérgio Figueiredo",
        "description": "20 Ago 2022 | 18:27 O Chega e a Iniciativa Liberal (IL) exigiram hoje mais explicações ao ministro das Finanças sobre as ligações entre Fernando Medina e Sérgio Figueiredo, ex-diretor de informação que renunciou ao cargo de consultor das Finanças. O partido Chega, em comunicado, pediu hoje mais esclarecimentos sobre este caso e solicitou à câmara de Lisboa, que Medina presidiu antes de ir para o Governo, que 'torne públicos todos os contratos existentes ou que existiram', assim como avenças de prestação de serviços, entre o município e 'Sérgio Figueiredo ou familiares, ou empresas de que estes sejam titulares ou proprietários de facto'.Este pedido surge depois de o semanário Novo ter noticiado que a Câmara Municipal de Lisboa, liderada por Fernando Medina, atribuiu um apoio de 350 mil euros a um evento organizado pelo filho de Sérgio Figueiredo, na altura diretor da TVI, de que o canal foi 'media partner'.O Chega já tinha apresentado uma denúncia à Inspeção-Geral de Finanças (IGF) sobre 'a eventual troca de favores entre Medina e Sérgio Figueiredo'.Sérgio Figueiredo, antigo diretor de informação da TVI, renunciou em 17 de agosto ao cargo de consultor do ministro das Finanças, comunicando a decisão através de um texto publicado no Jornal de Negócios, após semanas de polémica e críticas de partidos políticos e comentadores. O jornal Público noticiou em 09 de agosto que o Ministério das Finanças tinha contratado o antigo diretor de informação da TVI e ex-administrador da Fundação EDP Sérgio Figueiredo como consultor estratégico para fazer a avaliação e monitorização do impacto das políticas públicas, escolha que motivou críticas de partidos políticos e comentadores.Hoje, o Chega afirmou ser 'importante que toda a verdade deste emaranhado estranho de relações seja definido e clarificado, em nome da transparência e da integridade do exercício de funções públicas'.Já a Iniciativa Liberal, também em comunicado, considerou que as notícias dos últimos dias 'adicionam factos que comprovam a existência de uma teia de relações construída' entre Fernando Medina e Sérgio Figueiredo, 'tornando absolutamente evidente a forma despudorada como se usa e abusa do dinheiro dos contribuintes'.NS // ZO By Impala News / Lusa Siga a Impala no Instagram",
        "image": "https://www.impala.pt/wp-content/uploads/2022/08/38979838.JPG",
        "url": "https://www.impala.pt/noticias/politica/chega-e-il-querem-mais-esclarecimentos-das-ligacoes-de-medina-e-sergio-figueiredo/",
        "score": 0,
        "categoryId": 46,
        "createdAt": "2022-08-21T15:43:13.100Z",
        "publicatedAt": "2022-08-20 17:27:02",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 152,
        "title": "Chega e IL querem mais esclarecimentos das ligações de Medina e Sérgio Figueiredo",
        "description": "O partido Chega, em comunicado, pediu hoje mais esclarecimentos sobre este caso e solicitou à câmara de Lisboa, que Medina presidiu antes de ir para o Governo, que \"torne públicos todos os contratos existentes ou que existiram\", assim como avenças de prestação de serviços, entre o município e \"Sérgio Figueiredo ou familiares, ou empresas de que estes sejam titulares ou proprietários de facto\". Este pedido surge depois de o semanário Novo ter noticiado que a Câmara Municipal de Lisboa, liderada por Fernando Medina, atribuiu um apoio de 350 mil euros a um evento organizado pelo filho de Sérgio Figueiredo, na altura diretor da TVI, de que o canal foi \"media partner\". O Chega já tinha apresentado uma denúncia à Inspeção-Geral de Finanças (IGF) sobre \"a eventual troca de favores entre Medina e Sérgio Figueiredo\". Sérgio Figueiredo, antigo diretor de informação da TVI, renunciou em 17 de agosto ao cargo de consultor do ministro das Finanças, comunicando a decisão através de um texto publicado no Jornal de Negócios, após semanas de polémica e críticas de partidos políticos e comentadores. O jornal Público noticiou em 09 de agosto que o Ministério das Finanças tinha contratado o antigo diretor de informação da TVI e ex-administrador da Fundação EDP Sérgio Figueiredo como consultor estratégico para fazer a avaliação e monitorização do impacto das políticas públicas, escolha que motivou críticas de partidos políticos e comentadores. Hoje, o Chega afirmou ser \"importante que toda a verdade deste emaranhado estranho de relações seja definido e clarificado, em nome da transparência e da integridade do exercício de funções públicas\". Já a Iniciativa Liberal, também em comunicado, considerou que as notícias dos últimos dias \"adicionam factos que comprovam a existência de uma teia de relações construída\" entre Fernando Medina e Sérgio Figueiredo, \"tornando absolutamente evidente a forma despudorada como se usa e abusa do dinheiro dos contribuintes\".",
        "image": "https://cdn-images.rtp.pt/noticias/images/default_noticias.png?w=860&q=90&auto=format",
        "url": "https://www.rtp.pt/noticias/politica/chega-e-il-querem-mais-esclarecimentos-das-ligacoes-de-medina-e-sergio-figueiredo_n1427554",
        "score": 0,
        "categoryId": 46,
        "createdAt": "2022-08-21T15:43:13.092Z",
        "publicatedAt": "2022-08-20 18:31:30",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 151,
        "title": "Líder parlamentar do PSD lança livro académico sobre impostos e sem opinião política",
        "description": "Joaquim Miranda Sarmento, líder parlamentar do PSD e professor universitário, vai lançar um novo livro académico sobre impostos que, como é habitual neste tipo de obras da sua autoria, não tem opinião política.No total, entre os títulos já publicados e os que estão no prelo, o líder da bancada social-democrata contabiliza 28 livros, a maioria de teor académico na área das finanças e da economia.Só em dois títulos, o docente assume as suas opiniões e foi um deles – 'A reforma das finanças públicas em Portugal' – que o primeiro-ministro António Costa usou, no debate do estado da Nação, em Julho passado, para o atacar. Foi a primeira investida do chefe de Governo ao líder parlamentar estreante.O outro livro com considerações políticas intitula-se 'Portugal, Liberdade e Esperança' e foi apresentado em 2021 pelo antigo vice-primeiro-ministro Paulo Portas. Costa pegou em propostas como a reposição do IVA na restauração a 23% ou a criação de IRS mínimo de 40 euros, que constam de uma tabela do livro lançado em 2019, para colar Miranda Sarmento à ideia de austeridade. E prometeu, em jeito de brincadeira, abrir uma 'excepção' nas suas leituras de férias para ler toda a publicação.O livro visado pelo primeiro-ministro foi apresentado em Abril de 2019 pelo ex-Presidente da República Cavaco Silva quando Joaquim Miranda Sarmento era porta-voz do conselho nacional estratégico (CEN) do PSD para a área das finanças públicas.As propostas inscreviam-se no contexto pré-pandemia mas Miranda Sarmento continua a defender, por exemplo, que a descida do IVA na restauração 'foi um erro' e que se a medida não tivesse sido adoptada teria sido possível posteriormente, durante a crise de covid-19, baixar a taxa. 'Assim, ficaram por cobrar por ano entre 400 e 500 milhões de euros de receita fiscal', argumenta.O novo manual 'Impostos: Porquê e para quê?', que fica disponível nas bancas na próxima quarta-feira, aborda os fundamentos básicos dos impostos e estará enxuto de opiniões políticas. 'Um manual é para informar e não para influenciar. O autor não deve influenciar com a sua opinião', justifica ao PÚBLICO Joaquim Miranda Sarmento, que só deverá fazer a apresentação pública na segunda quinzena de Setembro.O líder parlamentar do PSD tem também em preparação um outro manual em inglês ('Introductory taxation for finance and account') sobre a base conceptual de impostos sem entrar no modelo fiscal dos países.Com as novas funções de liderança parlamentar, Miranda Sarmento ficará com mais limitações de tempo para actividades fora da política. Para já, o professor universitário só deverá dar aulas (não remuneradas) no ISEG no segundo semestre do próximo ano. Quanto à possibilidade de lançar mais publicações, Miranda Sarmento é cauteloso: 'Espero que sim, vamos ver'.",
        "image": "https://imagens.publico.pt/imagens.aspx/1725577?tp=UH&db=IMAGENS&type=JPG&share=1&o=BarraFacebook_Publico.png",
        "url": "https://www.publico.pt/2022/08/21/politica/noticia/lider-parlamentar-psd-lanca-livro-academico-impostos-opiniao-politica-2017686",
        "score": 0,
        "categoryId": 46,
        "createdAt": "2022-08-21T15:43:13.086Z",
        "publicatedAt": "2022-08-21 05:00:00",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 150,
        "title": "EUA alertam que Rússia tenta contornar sanções ocidentais via Turquia Por Reuters",
        "description": "WASHINGTON (Reuters) - O vice-secretário do Tesouro dos EUA, Wally Adeyemo, disse ao vice-ministro das Finanças da Turquia, Yunus Elitas, que entidades e indivíduos russos estavam tentando usar a Turquia para contornar as sanções ocidentais impostas pela guerra de Moscou na Ucrânia. Segundo o Departamento do Tesouro, os dois também discutiram em um telefonema os esforços em andamento para implementar e aplicar sanções contra a Rússia. (Por Rami Ayyub)",
        "image": "https://i-invdn-com.investing.com/news/world_news_3_69x52._800x533_L_1419494235.jpg",
        "url": "https://br.investing.com/news/world-news/eua-alertam-que-russia-tenta-contornar-sancoes-ocidentais-via-turquia-1029237",
        "score": 0,
        "categoryId": 46,
        "createdAt": "2022-08-21T15:43:13.081Z",
        "publicatedAt": "2022-08-20 17:58:00",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      },
      {
        "id": 149,
        "title": "Câmara Municipal de Lisboa concedeu apoio de 350 mil euros a empresa do filho de Sérgio Figueiredo",
        "description": "A Câmara Municipal de Lisboa (CML), liderada por Fernando Medina, concedeu um apoio de 350 mil euros a um evento organizado pelo filho de Sérgio Figueiredo, na altura diretor da TVI, do qual a estação de televisão foi media partner, noticia o semanário Novo (acesso livre). O apoio destinou-se à realização de um evento na área da sustentabilidade chamado Planetiers World Gathering 2020, tendo a TVI recebido um valor 'considerável' por ser media partner da iniciativa, confirmou o antigo diretor de informação da TVI ao mesmo jornal, sem revelar o montante em causa. O semanário Novo adianta ainda que em 2020, o canal de televisão deu relevância ao evento, bem como à empresa que foi responsável pela sua organização: a Planetiers Eventos, Marketing e Comunicação detida pela Planetiers New Generation, que tem Sérgio Jacob Ribeiro como sócio-gerente com uma participação de 33,34%. O restante capital é detido por outros dois acionistas. Na sequência desta notícia, o Chega e a Iniciativa Liberal (IL) exigiram mais explicações ao ministro das Finanças sobre as ligações entre Fernando Medina e Sérgio Figueiredo, ex-diretor de informação que renunciou ao cargo de consultor das Finanças. Em comunicado citado pela Lusa, o partido liderado por André Ventura pediu mais esclarecimentos sobre este caso e solicitou à câmara de Lisboa, que Medina presidiu antes de ir para o Governo, que 'torne públicos todos os contratos existentes ou que existiram', assim como avenças de prestação de serviços, entre o município e 'Sérgio Figueiredo ou familiares, ou empresas de que estes sejam titulares ou proprietários de facto'. Já a IL também em comunicado citado pela Lusa, considerou que as notícias dos últimos dias 'adicionam factos que comprovam a existência de uma teia de relações construída' entre Fernando Medina e Sérgio Figueiredo, 'tornando absolutamente evidente a forma despudorada como se usa e abusa do dinheiro dos contribuintes'.",
        "image": "https://eco.imgix.net/uploads/2020/03/cropped-doc-20190312-25806080-jsg_2819-2.jpg?mark64=aHR0cHM6Ly9lY28uaW1naXgubmV0L0VDT193YXRlcm1hcmsucG5nP2ZtPXBuZw%3D%3D&markscale=33&markalign=center,left&w=1200",
        "url": "https://eco.sapo.pt/2022/08/21/camara-municipal-de-lisboa-concedeu-apoio-de-350-mil-euros-a-empresa-do-filho-de-sergio-figueiredo",
        "score": 0,
        "categoryId": 46,
        "createdAt": "2022-08-21T15:43:13.072Z",
        "publicatedAt": "2022-08-21 09:31:05",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
      }
    ]
}
```
</p>
</details>
<details>
<summary>exibir resumo do response </summary>
<p>

```json

    {
    "anime": [
      {
        "id": 238,
        "title": "A arte de se divertir com animes e mangás ruins",
        "description": "Nas últimas décadas a indústria dos animes foi capaz de criar histórias fascinantes e encantadoras… mas não todas. Os Cowboy Bebop e Fullmetal Alchemist Brotherhood que me perdoem, mas a maioria das produções feitas ano após ano no Japão são séries medianas e alguns animes péssimos. Não que isso seja um problema! O que acontece quando gostamos de um anime ruim? É algo que precisamos esconder das pessoas? Qual é a utilidade de um anime cujas qualidade estão lá no pré-sal? Com o lançamento (e a discussão) causada pela chegada de Bleach: Thousand-Year Blood War, talvez seja a hora de conversarmos sobre esse apreço que sentimos por histórias não tão boas assim.{...},
        "image": "https://cdn.ome.lt/x_7BB_74axxsYqV2NKgYw9auxvc=/1200x630/smart/extras/conteudos/bleach-novo-anime.jpg",
        "url": "https://www.omelete.com.br/anime-manga/diversao-animes-mangas-ruins",
        "score": 0,
        "categoryId": 37,
        "createdAt": "2022-09-15T20:29:43.941Z",
        "publicatedAt": "2022-09-14 20:06:42",
        "votes": {
          "hotVotes": 0,
          "coldVotes": 0
        }
    },
    ...
    ],
     "filmes": [
    {
      "id": 248,
      "title": "Timothée Chalamet revela conselho de Leonardo DiCaprio: 'sem drogas pesadas ou filmes de super-heróis'",
      "description": "Em entrevista à revista Time, em outubro de 2021, Timothée Chalamet revelou que um grande nome de Hollywood havia lhe aconselhado que o segredo para o sucesso seria não usar drogas pesadas ou fazer filmes de super-heróis. Agora, à Vogue, o astro de \"Duna\" (2021) e \"Me chame pelo seu nome\" (2017) admite que foi Leonardo DiCaprio o responsável pela dica. 'Um dos meus heróis me abraçou, na primeira noite em que nos conhecemos, e me deu alguns conselhos. Sem drogas pesadas e sem filmes de super-heróis', lembrou o ator. Até o momento, Chalamet vem seguindo o conselho de DiCaprio no que diz respeita aos filmes de heróis. O ator ainda não se juntou aos universos da Marvel ou da DC nos cinemas. No momento, ele está trabalhando na divulgação de \"Bones and all\" (2022), novo filme de Luca Guadagnino, e será visto em breve em \"Wonka\", sobre a origem de Willy Wonka, personagem de \"A fantástica fábrica de chocolates\", e \"Duna: Parte 2\".",
      "image": "https://s2.glbimg.com/s5wAegXJKR4UF2MFSl9bDUXrl90=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2022/9/L/GfFML7R0mbYxknPou9pg/arte-3-.png",
      "url": "https://oglobo.globo.com/cultura/filmes/noticia/2022/09/timothee-chalamet-revela-conselho-de-leonardo-dicaprio-sem-drogas-pesadas-ou-filmes-de-super-herois.ghtml",
      "score": 0,
      "categoryId": 45,
      "createdAt": "2022-09-15T20:29:46.067Z",
      "publicatedAt": "2022-09-15 17:45:00",
      "votes": {
        "hotVotes": 0,
        "coldVotes": 0
      }
    },

```
</p>
</details><br/>

## Obter noticias mais bem avaliadas
São exibidas as 10 noticias mais bem avaliadas oredenadas da melhor para pior avaliada
### Request
`Get /tops` <br/>

Rota:

    localhost:5000/tops 

Header:

    Bearer <Token>

### Response

<details>
<summary> Ver response longo</summary>
<p>

    [
      {
        "id": 5,
        "title": "[Quiz] Naruto: Essas frases foram ou não foram ditas pelo Sasuke?",
        "description": "Será que você é mesmo um fã de Sasuke? 10/08/2022 Sasuke Uchiha é um divisor de águas entre os fãs de Naruto. Tendo sido visto como antagonista em vários momentos da franquia, boa parte dos que acompanham a história nutrem uma espécie de antipatia por ele, enquanto outra parte, igualmente grande, o ama de modo incondicional.Mas, seja qual for sua opinião sobre ele, é um fato inegável que o rapaz conseguiu protagonizar alguns dos momentos mais marcantes do anime com frases emblemáticas que impressionavam tanto para o bem, quanto de forma negativa. Então será que você conseguirá distinguir o que realmente foi dito por ele e o que não foi? Faça o teste abaixo, descubra se sua memória anda boa e divida o resultado com a gente nos comentários!",
        "image": "https://kanto.legiaodosherois.com.br/w728-h381-gnw-cfill-gcc-f:fbcover/wp-content/uploads/2022/08/legiao_XFBeApbT3jth.png.webp",
        "url": "https://www.legiaodosherois.com.br/quiz/naruto-frases-sasuke.html",
        "score": 1,
        "categoryId": 37,
        "createdAt": "2022-08-11T02:59:57.736Z",
        "publicatedAt": "2022-08-10 17:03:45"
      },
      {
        "id": 1,
        "title": "Os Simpsons finalmente vão parodiar Death Note",
        "description": "Todos nós sabemos que Os Simpsons fazem paródia de tudo e não perdoam nada, porém a mente criativa do showrunner Matt Selman ignorou completamente o fenômeno que Death Note se tornou ainda em 2003. Correndo atrás do tempo perdido, ele decidiu incluir uma história baseada no anime de sucesso dentro do especial Treehouse of Horror da Temporada 34. Ele afirma que tiveram até de mudar o estilo de arte para criar o clima do episódio. 'Este trecho foi animado por um estúdio completamente diferente. É um incrível e autêntico anime do nosso desenho. Acredito que as pessoas ficarão muito empolgadas quando assistirem, mas não faremos isso para cada animação de sucesso do Japão. Ele é um gênero inacreditavelmente rico e diverso já. Só quisemos investir nessa paixão nossa, que é o show Death Note'. O que Os Simpsons estão aprontando? Os detalhes deste episódio de Os Simpsons não foram revelados, mas é quase uma certeza que um dos membros da família terá o controle sobre o caderno da morte e provocará uma bagunça ainda maior em Springfield. A data do especial também não foi divulgada, sendo a única informação disponível a estreia desta nova temporada: dia 25 de setembro de 2022. Veja mais em Animações e Curtas! ** Este texto não reflete, necessariamente, a opinião do Portal UAI.",
        "image": "https://i0.wp.com/nerdizmo.uai.com.br/wp-content/uploads/sites/29/2022/08/os-simpsons-parodia-death-note.jpg?fit=1280%2C720&ssl=1",
        "url": "https://nerdizmo.uai.com.br/os-simpsons-parodia-death-note/",
        "score": 0,
        "categoryId": 37,
        "createdAt": "2022-08-11T02:59:57.712Z",
        "publicatedAt": "2022-08-10 15:00:00"
      },
      {
        "id": 6,
        "title": "Pokémon Legends: Arceus vai ganhar um especial na Netflix; veja o trailer",
        "description": "A Netflix está prestes a lançar um novo especial animado para a franquia de Pokémon. Desta vez, a inspiração será o game Pokémon Legends: Arceus. Dia dos Pais 2022: presenteie aquele que te inspira! Confira esse guia de presentes para encontrar o presente ideal e o melhor: com ofertas que chegam a 52% de desconto! Clique aqui para conferir. O anime especial, intitulado como The Arceus Chronicles, deverá seguir os personagens Ash, Goh, Dawn e Brock em uma tentativa de salvar a região de Sinnoh. The Arceus Chronicles tem estreia mundial (exceto Ásia) marcada para 23 de setembro. No entanto, a data brasileira ainda não foi confirmada oficialmente. O especial deriva diretamente de Pokémon: Jornadas de Mestre e terá 4 episódios. A Pokémon Company também anunciou, neste ano, um anime baseado em Pokémon Legends: Arceus. Aparentemente, trata-se de um projeto em paralelo. Leia a sinopse: 'Uma visita à região de Sinnoh se transforma em uma aventura de alto risco quando Ash, Pikachu e amigos unem forças com Pokémons poderosos para enfrentar uma ameaça iminente! Quando Ash, Goh e Dawn recebem uma mensagem misteriosa do Mítico Pokémon Arceus, eles se encontram com Brock e vão ao Monte Coronet para investigar. Lá, encontram um Heatran e os comandantes da Equipe Galáctica, que estão determinados a encontrar seu líder desaparecido abrindo um portão entre as dimensões. Com um trio de Pokémon lendários e a campeã do Sinnoh Cynthia ao seu lado, nossos heróis têm muita ajuda, mas precisarão de tudo o que puderem para salvar Sinnoh'. Assista ao trailer (em inglês): Dia dos Pais 2022: presenteie aquele que te inspira! Confira esse guia de presentes para encontrar o presente ideal e o melhor: com ofertas que chegam a 52% de desconto! Clique aqui para conferir. Sobre Pokémon Legends: Arceus Pokémon, a franquia, foi criada por Satoshi Tajiri em 1995 e o primeiro game da série, Pokémon Red e Blue, foi lançado para o Game Boy da Nintendo em 1996. Este universo é habitado pelas criaturas de mesmo nome, que podem ser capturadas por treinadores e serem treinadas para participarem de batalhas, entre outras coisas. Vários outros games da série foram lançados desde então, como Pokémon Gold, Silver e Crystal; Ruby, Sapphire e Emerald, FireRed e LeafGreen, Diamond, Pearl e Platinum, entre outros. Cada título apresentou uma nova geração de monstrinhos para os jogadores por se passarem em continentes diferentes. Em 2022, após tantos anos de sucesso mantendo a mesma fórmula, o game Pokémon Legends: Arceus veio para revolucionar, lançado exclusivamente para o Nintendo Switch. O novo jogo apresenta mecânicas inéditas de captura, batalha e muitos outros, modificando elementos já conhecidos dos fãs da franquia. Legends: Arceus se passa na ancestralidade da região de Sinnoh, quando ainda se chamava Hisui. Como não poderia deixar de ser, traz monstrinhos inéditos, além das já famosas formas regionais. Dia dos Pais 2022: presenteie aquele que te inspira! Confira esse guia de presentes para encontrar o presente ideal e o melhor: com ofertas que chegam a 52% de desconto! Clique aqui para conferir. Veja também:  Novidades de Pokémon Scarlet & Violet provocam reações mistas Quer enviar uma lista ou artigo? (Pode até virar vídeo no canal!) Clique aqui!",
        "image": "https://www.einerd.com.br/wp-content/uploads/2022/01/pokemon-legend-arceus.jpg",
        "url": "https://www.einerd.com.br/pokemon-legends-arceus-especial/",
        "score": 0,
        "categoryId": 37,
        "createdAt": "2022-08-11T02:59:57.742Z",
        "publicatedAt": "2022-08-10 18:20:07"
      },
      {
        "id": 3,
        "title": "Artista imagina personagens de Jujutsu Kaisen como membros da Akatsuki de Naruto",
        "description": "Os membros principais de Jujutsu como antagonistas de Naruto! 10/08/2022 Desde o fim da história principal de Naruto, os fãs de shounen se perguntam qual será o anime que substituirá o clássico no meio otaku. Jujutsu Kaisen é um forte candidato ao título e, recentemente, a artista lady_pinky_designer imaginou um crossover entre as duas obras, colocando os personagens principais do mangá de Gege Akutami como membro da Akatsuki. Na ilustração podemos ver Megumi, Nobara, Gojou, Nanami, Inumaki e o protagonista Itadori trajando os emblemáticos mantos negros de nuvens vermelhas característicos da organização antagonista de Naruto. Para além da vestimenta, as poses assumidas pelos personagens entregam quem eles representariam na Akatsuki se fizessem parte dela.Megumi, sempre tão sério, seria Pain, o líder da Akatsuki. Já Gojou, por ser o mais poderoso, assumiu uma pose que claramente o coloca no lugar de Itachi Uchiha, o mais popular entre os vilões. Nobara é a única representante feminina na arte e assume o posto de Konan, única mulher a integrar a Akatsuki.As poses dos persoangens denunciam quais seriam seus papéis na Akatsuki. Atrás dela está Nanami, usando tanto a bandana quanto os acessórios de Kisame. Inumaki representa Sasori, ostentando a mesma pose misteriosa do manipulador de marionetes, enquanto Itadori se senta mais descontraído à frente com a máscara de Tobi em suas mãos deixando nítido seu papel ali.A Akatsuki, originalmente, havia sido pensada como uma organização do bem, com o intuito de ajudar vítimas da terceira guerra ninja. Porém com o tempo, e a morte de seu fundador, se tornou um perigoso grupo de mercenários que antagonizou boa parte do anime clássico de Naruto e de sua fase shippuden.Mas e você? O que achou da escolha dos personagens? Acha que combina? Divida sua opinião com a gente nos comentários!Tanto Naruto quanto Jujutsu Kaisen estão disponíveis no catálogo da Crunchyroll.Aproveite e confira também:",
        "image": "https://kanto.legiaodosherois.com.br/w728-h381-gnw-cfill-gcc-f:fbcover/wp-content/uploads/2021/12/legiao_EyHZjtYB5Ji8.jpg.webp",
        "url": "https://www.legiaodosherois.com.br/2022/artista-imagina-jujutsu-kaisen-akatsuki-naruto.html",
        "score": 0,
        "categoryId": 37,
        "createdAt": "2022-08-11T02:59:57.725Z",
        "publicatedAt": "2022-08-10 03:01:19"
      },
      {
        "id": 57,
        "title": "Tecnologia da vacina contra a covid-19 é estudada para HIV e câncer",
        "description": "Bernardo Portella e Peter Ilicciev / Divulgação Bio-Manguinhos - Fiocruz Instalações da fábrica de vacinas da Fiocruz, Bio-manguinhos, no Rio de Janeiro. Embora alvo de pesquisas há mais de 30 anos, a tecnologia de RNA mensageiro (RNAm) parecia ainda distante de se tornar realidade. Porém, com a pandemia e o investimento nunca antes visto na história das vacinas, vieram duas conquistas inéditas para a área: os primeiros imunizantes com a tecnologia inovadora a serem aprovados e aplicados em larga escala, e a produção de vacinas desenvolvidas em tempo recorde, em menos de um ano. Agora, que além de consolidada e segura a tecnologia se mostrou altamente eficaz, já estão em testes estratégias com a técnica para a prevenção inédita de doenças como HIV, zika, ebola, herpes, além de novas vacinas mais eficazes para tuberculose, malária, dengue e gripe. Há até mesmo estudos promissores que implementam o RNAm para o combate ao câncer e de diagnósticos como diabetes e anemia falciforme. Os pesquisadores traçam um cenário otimista para grandes avanços científicos na próxima década. E o Brasil deve ganhar destaque com a produção própria de imunizantes e terapias que adotam a tecnologia. Na Bahia, já é desenvolvida uma nova vacina contra a covid-19 que utiliza a plataforma, por cientistas do Senai Cimatec, que está em testes clínicos. Em 2021, Bio-Manguinhos, da Fiocruz, foi escolhido pela Organização Mundial de Saúde (OMS) como parte de uma seleção mundial para incentivar a criação de imunizantes com o RNAm. Além de também desenvolver uma nova vacina para a covid-19 com a tecnologia, o instituto pesquisa terapias para câncer e prevenção de outras doenças. \"Nós estávamos trabalhando com tecnologia de RNAm por alguns anos, principalmente focado em vacinas terapêuticas para o tratamento do câncer, mas com a pandemia passamos também a desenvolver nossa própria vacina para a covid-19 de RNAm, que está em testes. Essa tecnologia estava em estudos há décadas, mas deu esse salto com a crise sanitária e se mostrou de fato muito eficaz. Agora esperamos que vamos ter resultados positivos semelhantes com outras doenças — afirma o vice-diretor de Desenvolvimento Tecnológico de Bio-Manguinhos, Sotiris Missailidis. As altas expectativas que envolvem o RNA mensageiro se dão por alguns fatores. O primeiro deles é a forma de atuação. Basicamente, trata-se de um código com instruções para que as células do corpo produzam determinada proteína. No caso das vacinas da covid-19, em vez de o imunizante introduzir o vírus inativado ou uma parte dele para que o sistema imunológico produza as defesas, o RNAm utiliza o próprio organismo como 'fábrica' da proteína S do coronavírus, que então é lida pelo corpo para produzir as células de defesa e anticorpos. \"Sem dúvida o RNAm revolucionou a vacinologia, porque você consegue através de um código levar o indivíduo que recebe a vacina a produzir a própria proteína. Isso é uma revolução porque permite que produzamos proteínas contra qualquer coisa, então anticorpos contra alguma doença, proteínas que inviabilizam tumores, doenças degenerativas. Em teoria, a tecnologia é aplicável para diabetes, Alzheimer, câncer, não apenas doenças infecciosas. É uma esperança para muitas outras doenças que até então nós ou não temos vacina ou que precisamos de alternativas melhores — explica o infectologista e diretor da Sociedade Brasileira de Imunizações (SBIm), Renato Kfouri. Ele conta que, desde 1990, a plataforma é estudada, mas era considerada instável em testes. A situação mudou em 2005, quando uma equipe de pesquisadores americanos desenvolveu cápsulas de gordura, chamadas de lipossomos, que envolvem o RNAm e conseguem levá-lo integralmente ao organismo. Um dos cientistas responsáveis pela descoberta escreveu inclusive um artigo na revista científica Nature Reviews Drug Discovery, em 2018, intitulado 'Vacinas de RNAm - Uma nova era na vacinologia', em que listou uma série de estudos com resultados promissores da tecnologia. Além do amplo potencial, as vacinas de mRNA têm demonstrado eficácia superior aos modelos convencionais e têm um potencial para fabricação com menor custo. Isso porque, pela plataforma ser sintética, e não envolver vírus vivos, não exige, por exemplo, um laboratório de biossegurança. Além disso, podem ser desenvolvidas e adaptadas de forma mais rápida, o que possibilitou que os imunizantes da Covid-19 tivessem os testes clínicos iniciados menos de seis meses após o Sars-CoV-2 ter sido descoberto na China, em 2019. Um dos resultados mais aguardados para a nova geração de vacinas que começam a ser testadas é a do imunizante contra o HIV. Neste ano, a Moderna – farmacêutica criada com foco no RNAm e responsável por uma das vacinas da covid-19 – deu início à fase 1 dos testes clínicos com algumas candidatas. Estão também na primeira etapa os estudos com um imunizante para o Nipah henipavírus (NiV), patógeno altamente letal, originalmente de animais, que provoca surtos pontuais em humanos na Índia e em Bangladesh. Porém, essas não devem ser as próximas a saírem do papel. O laboratório conduz ainda testes com uma vacina para o vírus da Zika, que já estão em fase 2, e para uma nova versão do imunizante contra o vírus Influenza, causador da gripe, que está na fase 3. Há também estudos para versões conjuntas de vacina da gripe com a da covid-19 e uma proteção para o vírus sincicial respiratório (VSR), microrganismo que causa um alto número de hospitalizações e óbitos em crianças pequenas e ainda não pode ser combatido com imunizantes. Potencial de produção no Brasil Louis Reed / Unsplash já estão em testes estratégias com a técnica para a prevenção inédita de doenças como HIV, zika, ebola, herpes, além de novas vacinas mais eficazes para tuberculose, malária, dengue e gripe. Missailidis, da Fiocruz, destaca que, embora a produção de vacinas com a nova tecnologia esteja começando principalmente em países do exterior, eventualmente Bio-manguinhos pode se tornar autônomo na fabricação de terapias com RNAm. \"Nosso maior problema era ter a capacidade de desenvolver novas tecnologias sem depender dos Estados Unidos, da Europa, de países que normalmente chegam com os produtos primeiro e depois fazem uma transferência de tecnologia. O esforço que estamos fazendo nesse momento é para mudar esse paradigma. E nós podemos usar o RNAm para doenças raras, doenças negligenciadas, que muitas vezes não são de interesse de grandes farmacêuticas, mas que a Fiocruz, como uma instituição pública, tem a missão de poder atender essa parte da população\", diz o vice-diretor de Desenvolvimento Tecnológico de Bio-manguinhos. O novo imunizante da Fiocruz para a covid-19 de RNAm, que deve começar os testes clínicos no início do ano que vem, tem ainda o diferencial de despertar a resposta imune não apenas com a proteína S do coronavírus, mas também a N. Segundo Sotiris, a segunda proteína é mais conservada, então espera-se que ofereça uma maior imunidade para proteger contra novas variantes. Há também o desenvolvimento da tecnologia pelo Senai Cimatec, na Bahia, em parceria com a empresa HDT Bio Corp, dos Estados Unidos. O infectologista e pesquisador-chefe da instituição, Roberto Badaró, que lidera a pesquisa, explica que a vacina de RNAm utiliza ainda uma nanopartícula inédita capaz de proteger a molécula e aumentar a absorção no organismo, e celebra o projeto como um passo importante para o domínio da plataforma no Brasil. \"Hoje nós temos capacidade de fabricar essa vacina aqui no Brasil, nós incorporamos essa tecnologia lá no Senai Cimatec e estamos terminando os estudos de fase 1. É uma revolução grande essa plataforma, então nós estamos muito animados que o Brasil vai ter uma participação competitiva no cenário internacional de uma vacina moderna\", afirma Badaró. Ele conta que há um imunizante com a tecnologia também em testes para leishmaniose, uma doença provocada por um protozoário e transmitida por mosquitos que, se não tratada, pode ser altamente fatal. \"São milhares de pessoas que adquirem leishmaniose no Brasil e na América Latina, que é uma doença desfigurante que, quando pega a mucosa nasal, destrói o nariz, sendo uma doença séria, mas que não tem muita atenção por ser tropical. Só que essa tecnologia irá nos ajudar a fazer várias outras vacinas contra outras doenças\", acrescenta o infectologista. Nova arma contra o câncer Badaró, do Senai Cimatec, conta que há ainda vacinas terapêuticas em desenvolvimento na instituição para câncer de mama, próstata e ovário, que devem ganhar fôlego após o fim dos testes com o imunizante para a Covid-19. O combate a tumores é de fato uma das grandes promessas para o avanço da tecnologia, explica o médico oncologista e professor da Universidade Nove (Uninove), em São Paulo, Ramon Andrade de Mello. \"A expectativa da utilização do RNAm no tratamento do câncer é muito alta. Existem estudos com resultados muito promissores para o uso da tecnologia para que o próprio organismo produza proteínas que atuem com o sistema imune para combater o câncer de uma maneira mais eficaz\", explica o especialista, que faz parte do corpo clínico do Hospital Albert Einstein, também em São Paulo. Isso porque o câncer desenvolve uma proteína chamada de inibidora de checkpoint, que diz ao organismo que aquelas células são saudáveis, embora sejam cancerígenas – o que impede que o sistema imunológico combata o tumor. Porém, o oncologista explica que, com o RNAm, seria possível ensinar as células de defesa a reconhecerem a tal proteína, e então passarem a atacá-la. Em junho de 2021, a BioNTech – que desenvolveu um dos imunizantes para a covid-19 junto à Pfizer – anunciou que tratou o primeiro paciente com uma vacina de RNAm contra o câncer de pele, durante estudos clínicos da fase 2. \"Há uns 20 anos, o tratamento do câncer era muito voltado à quimioterapia, mas da última década para cá as novas tecnologias têm mudado a resposta ao problema. Cada vez mais, vamos chegando a melhores resultados e mais próximo de uma possível cura do câncer, ainda que seja um caminho complexo até lá. Para isso, o desenvolvimento de novas terapias, como o RNAm, é essencial. Creio que de 5 a 10 anos, vamos ter a plataforma incorporada às diretrizes médicas. Com certeza é uma tecnologia que merece atenção e investimento\", afirma o oncologista. Entre no  canal do Último Segundo no Telegram e veja as principais notícias do dia no Brasil e no Mundo. Siga também o  perfil geral do Portal iG.",
        "image": "https://i0.statig.com.br/bancodeimagens/1g/gt/0v/1ggt0vpi0zn361x7i1bc33s4q.jpg",
        "url": "https://saude.ig.com.br/2022-08-14/tecnologia-da-vacina-contra-a-covid-19-e-estudada-para-prevencao-ao-hiv-e-combate-ao-cancer.html",
        "score": 0,
        "categoryId": 43,
        "createdAt": "2022-08-14T21:33:29.426Z",
        "publicatedAt": "2022-08-14 16:53:05"
      },
      {
        "id": 47,
        "title": "Tecnologia da vacina contra a Covid-19 é estudada para prevenção ao HIV e combate ao câncer, com pesquisas no Brasil",
        "description": "Agora, que além de consolidada e segura a tecnologia se mostrou altamente eficaz, já estão em testes estratégias com a técnica para a prevenção inédita de doenças como HIV, zika, ebola, herpes, além de novas vacinas mais eficazes para tuberculose, malária, dengue e gripe. Há até mesmo estudos promissores que implementam o RNAm para o combate ao câncer e de diagnósticos como diabetes e anemia falciforme. Os pesquisadores traçam um cenário otimista para grandes avanços científicos na próxima década. E o Brasil deve ganhar destaque com a produção própria de imunizantes e terapias que adotam a tecnologia. Na Bahia, já é desenvolvida uma nova vacina contra a Covid-19 que utiliza a plataforma, por cientistas do Senai Cimatec, que está em testes clínicos. Em 2021, Bio-Manguinhos, da Fiocruz, foi escolhido pela Organização Mundial de Saúde (OMS) como parte de uma seleção mundial para incentivar a criação de imunizantes com o RNAm. Além de também desenvolver uma nova vacina para a Covid-19 com a tecnologia, o instituto pesquisa terapias para câncer e prevenção de outras doenças. — Nós estávamos trabalhando com tecnologia de RNAm por alguns anos, principalmente focado em vacinas terapêuticas para o tratamento do câncer, mas com a pandemia passamos também a desenvolver nossa própria vacina para a Covid-19 de RNAm, que está em testes. Essa tecnologia estava em estudos há décadas, mas deu esse salto com a crise sanitária e se mostrou de fato muito eficaz. Agora esperamos que vamos ter resultados positivos semelhantes com outras doenças — afirma o vice-diretor de Desenvolvimento Tecnológico de Bio-Manguinhos, Sotiris Missailidis. As altas expectativas que envolvem o RNA mensageiro se dão por alguns fatores. O primeiro deles é a forma de atuação. Basicamente, trata-se de um código com instruções para que as células do corpo produzam determinada proteína. No caso das vacinas da Covid-19, em vez de o imunizante introduzir o vírus inativado ou uma parte dele para que o sistema imunológico produza as defesas, o RNAm utiliza o próprio organismo como 'fábrica' da proteína S do coronavírus, que então é lida pelo corpo para produzir as células de defesa e anticorpos. — Sem dúvida o RNAm revolucionou a vacinologia, porque você consegue através de um código levar o indivíduo que recebe a vacina a produzir a própria proteína. Isso é uma revolução porque permite que produzamos proteínas contra qualquer coisa, então anticorpos contra alguma doença, proteínas que inviabilizam tumores, doenças degenerativas. Em teoria, a tecnologia é aplicável para diabetes, Alzheimer, câncer, não apenas doenças infecciosas. É uma esperança para muitas outras doenças que até então nós ou não temos vacina ou que precisamos de alternativas melhores — explica o infectologista e diretor da Sociedade Brasileira de Imunizações (SBIm), Renato Kfouri. Ele conta que, desde 1990, a plataforma é estudada, mas era considerada instável em testes. A situação mudou em 2005, quando uma equipe de pesquisadores americanos desenvolveu cápsulas de gordura, chamadas de lipossomos, que envolvem o RNAm e conseguem levá-lo integralmente ao organismo. Um dos cientistas responsáveis pela descoberta escreveu inclusive um artigo na revista científica Nature Reviews Drug Discovery, em 2018, intitulado 'Vacinas de RNAm - Uma nova era na vacinologia', em que listou uma série de estudos com resultados promissores da tecnologia. Além do amplo potencial, as vacinas de mRNA têm demonstrado eficácia superior aos modelos convencionais e têm um potencial para fabricação com menor custo. Isso porque, pela plataforma ser sintética, e não envolver vírus vivos, não exige, por exemplo, um laboratório de biossegurança. Além disso, podem ser desenvolvidas e adaptadas de forma mais rápida, o que possibilitou que os imunizantes da Covid-19 tivessem os testes clínicos iniciados menos de seis meses após o Sars-CoV-2 ter sido descoberto na China, em 2019. Um dos resultados mais aguardados para a nova geração de vacinas que começam a ser testadas é a do imunizante contra o HIV. Neste ano, a Moderna – farmacêutica criada com foco no RNAm e responsável por uma das vacinas da Covid-19 – deu início à fase 1 dos testes clínicos com algumas candidatas. Estão também na primeira etapa os estudos com um imunizante para o Nipah henipavírus (NiV), patógeno altamente letal, originalmente de animais, que provoca surtos pontuais em humanos na Índia e em Bangladesh. Porém, essas não devem ser as próximas a saírem do papel. O laboratório conduz ainda testes com uma vacina para o vírus da Zika, que já estão em fase 2, e para uma nova versão do imunizante contra o vírus Influenza, causador da gripe, que está na fase 3. Há também estudos para versões conjuntas de vacina da gripe com a da Covid-19 e uma proteção para o vírus sincicial respiratório (VSR), microrganismo que causa um alto número de hospitalizações e óbitos em crianças pequenas e ainda não pode ser combatido com imunizantes. Potencial de produção no Brasil Missailidis, da Fiocruz, destaca que, embora a produção de vacinas com a nova tecnologia esteja começando principalmente em países do exterior, eventualmente Bio-manguinhos pode se tornar autônomo na fabricação de terapias com RNAm. — Nosso maior problema era ter a capacidade de desenvolver novas tecnologias sem depender dos Estados Unidos, da Europa, de países que normalmente chegam com os produtos primeiro e depois fazem uma transferência de tecnologia. O esforço que estamos fazendo nesse momento é para mudar esse paradigma. E nós podemos usar o RNAm para doenças raras, doenças negligenciadas, que muitas vezes não são de interesse de grandes farmacêuticas, mas que a Fiocruz, como uma instituição pública, tem a missão de poder atender essa parte da população — diz o vice-diretor de Desenvolvimento Tecnológico de Bio-manguinhos. O novo imunizante da Fiocruz para a Covid-19 de RNAm, que deve começar os testes clínicos no início do ano que vem, tem ainda o diferencial de despertar a resposta imune não apenas com a proteína S do coronavírus, mas também a N. Segundo Sotiris, a segunda proteína é mais conservada, então espera-se que ofereça uma maior imunidade para proteger contra novas variantes. Há também o desenvolvimento da tecnologia pelo Senai Cimatec, na Bahia, em parceria com a empresa HDT Bio Corp, dos Estados Unidos. O infectologista e pesquisador-chefe da instituição, Roberto Badaró, que lidera a pesquisa, explica que a vacina de RNAm utiliza ainda uma nanopartícula inédita capaz de proteger a molécula e aumentar a absorção no organismo, e celebra o projeto como um passo importante para o domínio da plataforma no Brasil. — Hoje nós temos capacidade de fabricar essa vacina aqui no Brasil, nós incorporamos essa tecnologia lá no Senai Cimatec e estamos terminando os estudos de fase 1. É uma revolução grande essa plataforma, então nós estamos muito animados que o Brasil vai ter uma participação competitiva no cenário internacional de uma vacina moderna — afirma Badaró. Ele conta que há um imunizante com a tecnologia também em testes para leishmaniose, uma doença provocada por um protozoário e transmitida por mosquitos que, se não tratada, pode ser altamente fatal. — São milhares de pessoas que adquirem leishmaniose no Brasil e na América Latina, que é uma doença desfigurante que, quando pega a mucosa nasal, destrói o nariz, sendo uma doença séria, mas que não tem muita atenção por ser tropical. Só que essa tecnologia irá nos ajudar a fazer várias outras vacinas contra outras doenças — acrescenta o infectologista. Nova arma contra o câncer Badaró, do Senai Cimatec, conta que há ainda vacinas terapêuticas em desenvolvimento na instituição para câncer de mama, próstata e ovário, que devem ganhar fôlego após o fim dos testes com o imunizante para a Covid-19. O combate a tumores é de fato uma das grandes promessas para o avanço da tecnologia, explica o médico oncologista e professor da Universidade Nove (Uninove), em São Paulo, Ramon Andrade de Mello. — A expectativa da utilização do RNAm no tratamento do câncer é muito alta. Existem estudos com resultados muito promissores para o uso da tecnologia para que o próprio organismo produza proteínas que atuem com o sistema imune para combater o câncer de uma maneira mais eficaz — explica o especialista, que faz parte do corpo clínico do Hospital Albert Einstein, também em São Paulo. Isso porque o câncer desenvolve uma proteína chamada de inibidora de checkpoint, que diz ao organismo que aquelas células são saudáveis, embora sejam cancerígenas – o que impede que o sistema imunológico combata o tumor. Porém, o oncologista explica que, com o RNAm, seria possível ensinar as células de defesa a reconhecerem a tal proteína, e então passarem a atacá-la. Em junho de 2021, a BioNTech – que desenvolveu um dos imunizantes para a Covid-19 junto à Pfizer – anunciou que tratou o primeiro paciente com uma vacina de RNAm contra o câncer de pele, durante estudos clínicos da fase 2. — Há uns 20 anos, o tratamento do câncer era muito voltado à quimioterapia, mas da última década para cá as novas tecnologias têm mudado a resposta ao problema. Cada vez mais, vamos chegando a melhores resultados e mais próximo de uma possível cura do câncer, ainda que seja um caminho complexo até lá. Para isso, o desenvolvimento de novas terapias, como o RNAm, é essencial. Creio que de 5 a 10 anos, vamos ter a plataforma incorporada às diretrizes médicas. Com certeza é uma tecnologia que merece atenção e investimento — afirma o oncologista.",
        "image": "https://s2.glbimg.com/Hr_A0XnoYh9HvWKya-q9HyrhazM=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2022/A/b/mxXgfHSaq0NFs7fEcBSw/7515767508-229b97051a-k.jpg",
        "url": "https://oglobo.globo.com/saude/vacina-e-saude/noticia/2022/08/tecnologia-da-vacina-contra-a-covid-19-e-estudada-para-prevencao-ao-hiv-e-combate-ao-cancer-com-pesquisas-no-brasil.ghtml",
        "score": 0,
        "categoryId": 43,
        "createdAt": "2022-08-14T21:33:23.661Z",
        "publicatedAt": "2022-08-14 08:45:00"
      },
      {
        "id": 46,
        "title": "Santander tem NOVAS vagas de emprego pelo país",
        "description": "Por Michele Azevedo ultima atualização 13/08/2022 às 18:23 O Santander, destaque bancário no país, está anunciando novos empregos em diversas regiões do Brasil. São vários cargos que proporcionam benefícios diversos e salários compatíveis com o mercado. Veja as opções abertas, neste momento. Imagem: Santander – Reprodução Santander tem vagas de emprego pelo Brasil A empresa bancária está divulgando os cargos, a seguir, considerando como público alvo os profissionais qualificados e comprometidos com o sucesso de suas atividades. Anl Planejamento Financeiro (Exclusivo para PCD);Anl Rec Humanos SR (Treinamento e Desenvolvimento);Anl Tecnologia e Operações (PCD);Analista administrativo/ Consórcio (Exclusivo para PCD);Anl Tecnologia e Operações Pleno (Python/ PySpark);Analista de Tecnologia e Operações (Dados);Gerente de Empresas II – Polo Paulista – São Paulo/SP;Anl Tecnologia e Operações Pleno (DMPS);Gerente de Empresas I – Guaraí/TO;Gerente de Empresas I – Goiânia/GO;Gerente de Empresas II – Lauro de Freitas / BA;Analista Sênior de Dados;Anl Riscos Varejo III (Indicadores);Anl Tec e Operações Senior (Data Viz);Anl Tec e Operações Senior (Riscos PF e Cartoes);Anl Tec e Operações Senior (Telemetria de Motores);Anl Tecnologia e OperaçõesAnalista desenvolvedor SêniorGerente de Negócios e Serviços – EXCLUSIVA PARA PCD – SANTANDERGerente de Empresas II – Polo Jardins – São Paulo/SPGerente de Negócios e Serviços I – Araçatuba/SP (Exclusiva para pessoas com deficiência)Anl Tecnologia e Operações (Gestão de Projetos e Melhoria de Processos)Anl Tecnologia e Operações (PCD)Anl Tecnologia e Operações (Projetos)Assistente Comercial Prospera – Exclusiva para Pessoa com deficiência*Banco de Talentos para área de RiscosGerente de Empresas II (Expansão) – Rondonópolis/MTBRA Anl Tecnologia e Operações Pleno (Telemetria de Motores)Gerente de Empresas II – Polo Ibirapuera – São Paulo/SPGerente de Negócios e Serviços I – Bauru/SP (Exclusiva para pessoas com deficiência)Gerente de Empresas II – Polo República – São Paulo/SP. Veja também: Petz abre vagas de emprego para todo o país Como se candidatar Para efetuar a inscrição no processo seletivo do Santander, os interessados podem acessar a página, selecionar a vaga pleiteada e cadastrar currículo. É importante observar os critérios exigidos para cada cargo. Saiba mais sobre os empregos da semana, divulgados em primeira mão aqui no Notícias Concursos. Acompanhe diariamente as atualizações com processos seletivos de grandes empresas. Veja o que é sucesso na Internet: oportunidadessantandervagas de emprego Formada em Letras - Português/ Inglês, e idealizadora do site Escritora de Sucesso, busca expandir o conhecimento de todos com informações relevantes sobre diversos assuntos, enquanto redatora. No Notícias Concursos, divulga vagas de empregos diárias que possibilitam a sociedade a encontrar oportunidades em primeira mão.",
        "image": "https://noticiasconcursos.com.br/wp-content/uploads/2021/04/noticiasconcursos.com.br-santander-divulga-mais-de-1-mil-estagios-com-remuneracao-alta-santander-divulga-programa-de-estagios.jpg",
        "url": "https://noticiasconcursos.com.br/santander-tem-novas-vagas-de-emprego-pelo-pais/",
        "score": 0,
        "categoryId": 43,
        "createdAt": "2022-08-14T21:33:23.655Z",
        "publicatedAt": "2022-08-13 21:53:39"
      },
      {
        "id": 48,
        "title": "Tendências na tecnologia: aplicativos, 5G, malha de dados e inteligência artificial",
        "description": "A tecnologia faz parte do fluxo da inovação, bem como a inovação que traz novas tecnologias, criando um ciclo intangível de mudanças que impactam diretamente o mercado e o consumidor. São muitas as inovações tecnológicas que surgem no mercado, sendo assim, é importante para a gestão de uma empresa acompanhar as inovações do mercado de forma ampla. Aplicativos combinados Os aplicativos combinados são desenvolvidos por componentes modulares. De forma sucinta, essa tecnologia se refere ao desenvolvimento de um aplicativo voltado para os negócios. Assim sendo, a infraestrutura do aplicativo permite inovações e combinações, por isso é uma tendência tecnológica, já que acelera o processo de desenvolvimento. Tecnologia 5G A tecnologia 5G já está na rotina de pessoas e empresas, sendo que o seu processo de implementação no Brasil está em faseamento. Novas experiências para empresas e clientes A tecnologia 5G representa um grande avanço tecnológico, já que permite uma troca muito rápida de informações e experiências, otimizando processos e permitindo a inovação nas empresas. Mudanças nos processos empresariais e novos mercados Além disso, a tecnologia 5G cria outros caminhos para que as empresas melhorem seus fluxos de dados através de outras tecnologias, como o metaverso, por exemplo, sendo primordial para o futuro dos negócios, indo muito além da agilidade nos downloads. Malha de dados A malha de dados se refere a uma interação flexível entre fontes de dados. Sendo assim, essa é uma forma de facilitar fluxos e plataformas. Dessa maneira, é possível que a empresa se comunique, acessando dados relevantes, independentemente do local físico do acesso. Otimização da capacidade de análise A tecnologia de malha de dados é uma tendência, já que melhora a capacidade analítica de uma empresa, facilitando o fluxo do gerenciamento em até 70%. Inteligência artificial A inteligência artificial é uma realidade na rotina das pessoas e das empresas, no entanto, ela ainda é uma tendência que pode ser aperfeiçoada, já que diversas tecnologias inovadoras podem direcionar a inteligência artificial para novas programações. Otimização e avanços constantes Dessa forma, trata-se de uma inteligência que pode ser otimizada, já que a sua programação se baseia em padrões de valores e bancos de dados, permitindo que novos processos sejam criados dentro do fluxo contínuo da tecnologia na era digital. Tendências inovadoras de forma global Certamente, há muitas outras tendências tecnológicas, considerando o avanço da tecnologia em diversas outras vertentes, como a área da saúde e educação, por exemplo. Sendo assim, é importante que empresas e clientes se mantenham atualizados quanto às inovações do mercado, já que estamos na era da internet das coisas e novos produtos trazem novas necessidades. Veja o que é sucesso na Internet:",
        "image": "https://noticiasconcursos.com.br/wp-content/uploads/2022/08/noticiasconcursos.com.br-tendencias-na-tecnologia-aplicativos-5g-malha-de-dados-e-inteligencia-artificial-1.png",
        "url": "https://noticiasconcursos.com.br/tendencias-na-tecnologia-aplicativos-5g-malha-de-dados-e-inteligencia-artificial/",
        "score": 0,
        "categoryId": 43,
        "createdAt": "2022-08-14T21:33:23.667Z",
        "publicatedAt": "2022-08-13 14:53:41"
      },
      {
        "id": 9,
        "title": "Fã de Spy x Family viralizou com um cosplay perfeito da Anya",
        "description": "Spy x Family é um sucesso absoluto no mundo inteiro, e uma fã resolveu homenagear com um cosplay da Anya Forger que ficou simplesmente lindo e perfeito. Ela é uma telepata cujas habilidades foram criadas em um experimento conduzido por uma organização desconhecida. Ela é uma estudante em Cecile Hall na Eden Academy e filha adotiva de Loid Forger e Yor Forger. As verdadeiras origens de Anya, bem como a fonte de suas habilidades telepáticas, não são claras. Antes de ser encontrada no orfanato, ela foi feita por acidente, como uma consequência não intencional de experimentos de pesquisa conduzidos por uma organização desconhecida. Ela tinha o codinome ‘Test Subject '007'‘ e foi tratada com muita rigidez pelos cientistas, não sendo autorizada a jogar e forçada a aprender a usar seus poderes, aparentemente em prol da paz mundial. Anya – Reprodução: Spy x FamilyCom isso em mente, a fã e cosplayer daifuku.wu resolveu compartilhar em seu instagram um cosplay simplesmente impressionante da personagem, onde podemos ver todo o esforço e dedicação que ela teve para fazer o cosplay ser o mais realista possível, confira abaixo: Reprodução: @daifuku.wu Este cosplay da Anya ficou realmente muito bom, não é mesmo? Você pode conferir mais sobre o trabalho dela através do instagram bem aqui. Confira também: O anime de Spy x Family pode ser conferido por completo na Crunchyroll",
        "image": "https://criticalhits.com.br/wp-content/uploads/2022/06/anya-spy-x-family.jpg",
        "url": "https://criticalhits.com.br/cosplay/fa-de-spy-x-family-viralizou-com-um-cosplay-perfeito-da-anya/",
        "score": 0,
        "categoryId": 37,
        "createdAt": "2022-08-11T02:59:57.760Z",
        "publicatedAt": "2022-08-10 19:30:10"
      },
      {
        "id": 58,
        "title": "Por que o Predador visita a Terra em O Predador: A Caçada?",
        "description": "O novo O Predador: A Caçada trouxe uma nova perspectiva para a franquia de ficção científica e voltou no tempo mais de 300 anos para mostrar a primeira visita do alienígena ao planeta. Mas por que ele veio? Ambientado em meio às Grandes Planícies dos Estados Unidos, o Predador chega ao planeta e se depara com uma tribo de indígenas Comanches, que tentar um esforço corajoso e desesperado de proteger suas terras. Será que a visita é apenas uma expedição de caça? Afinal, a cultura guerreira, embora não discutida diretamente, parece ser um ponto importante da sociedade das criaturas. O Predador: A Caçada, se interpretado corretamente, pode explicar os demais filmes da franquia. Predador em O Predador: A Caçada (Reprodução) Filme ignorou crossovers? O marketing todo do novo filme foi construído em torno da premissa, que o diretor Dan Trachtenberg deixou bem claro não ter intenção de contar a origem do Predador. Em vez disso, o cineasta voltou tanto no tempo para retratar a primeira experiência do alienígena no planeta. Mas isso não contradiz informações prévias? O crossover Alien Vs Predador introduziu a informação de que a raça dos Predadores visitam a Terra há milênios, tendo inclusive sido quem ajudou civilizações antigas a construírem suas pirâmides e templos. Ao que parece, Dan e sua equipe decidiram que os filmes com o Alien não fazem parte da mitologia oficial da franquia, e os ignorou. Seguindo apenas os cinco filmes restantes, 1700 foi o século em que a Terra foi explorada pelos Predadores. Cena de Alien Vs Predador (Reprodução) Cena pós-créditos pode ser a resposta Depois que a protagonista Naru finalmente derrotou o Predador e garantiu a segurança de sua tribo, O Predador: A Caçada tem mais uma cena que pode sugerir que há mais história por aí. Uma sequência animada durante os créditos do filme reconta a história recém vista, porém sugere que mais naves chegariam em breve no planeta. Seria essa o enredo de O Predador: A Caçada 2? Cena pós-créditos de O Predador: A Caçada (Reprodução) Com a cena, pode-se teorizar que o primeiro visitante não veio para caçar, mas apenas fazer um reconhecimento. Depois de investigar as formas humanas que habitam o planeta, o alienígena poderia ter a tarefa de reportar de volta aos companheiros para estabelecer uma nova ‘área de caça'. Caso isso seja comprovado como verdade, também explica-se um pouco sobre as motivações dos Predadores nos demais filmes. Depois de descobrir um planeta com seres que proporcionam uma caça emocionante, os alienígenas passaram a voltar regularmente. O Predador: A Caçada já está disponível no Star+, assim como todos os demais filmes da franquia. Fonte: Screen Rant O que você achou? Siga @siteepipoca no Instagram para ver mais e deixar seu comentário clicando aqui. Gaúcho morando em São Paulo há quase uma década, formado em Letras, apaixonado por livros, jogos, música, séries e filmes! Pai de gatos com amor por escrever. O doido dos filmes e séries de terror.",
        "image": "https://epipoca.com.br/wp-content/uploads/2022/07/prey-predador-2-14072022.jpg",
        "url": "https://epipoca.com.br/?p=1005083",
        "score": 0,
        "categoryId": 45,
        "createdAt": "2022-08-14T21:33:29.433Z",
        "publicatedAt": "2022-08-13 19:30:11"
      },
      {
        "id": 7,
        "title": "Prey é a maior estreia de sempre no Hulu",
        "description": "O Hulu e a 20th Century Studios estão a celebrar uma nova vitória para o serviço de streaming, resultado do lançamento incrível de Prey que rapidamente se transformou na estreia mais popular de sempre dentro do Hulu. A novidade foi revelada através de um comunicado de imprensa, no qual a Disney anunciou então que Prey quebrou todos os recordes do Hulu, como estreia mais visualizada de sempre. Prey conseguiu ultrapassar todos os filmes e também séries estreadas no serviço de streaming até agora. Para além disso, Prey também se transformou na melhor estreia de sempre no Star+, na América Latina, e no Disney+, em territórios nos quais o Hulu não se encontra disponível. Prey conta com o regresso de Dan Trachtenberg à cadeira de realização, na qual não se sentava há pelo menos seis anos, desde que liderou a produção de 10 Cloverfield Lane. Apesar de ter sido a sua estreia nas longas-metragens, Trachtenberg demonstrou uma incrível habilidade, sobretudo para cenas de tensão, um aspeto já visível no teaser. Prey situa-se algures 300 anos antes dos eventos de Predador, protagonizado por uma jovem mulher chamada Naru, uma feroz e altamente habilidosa guerreira. Naru foi criada nas sombras de alguns dos mais lendários caçadores que vagueiam pelas Great Plains. Então, quando o perigo chega ao seu acampamento, Naru vai fazer de tudo para proteger o seu povo. A presa que ela caça, e que acaba por combater, é na verdade um predador extra-terrestre altamente evoluído, com um grande arsenal ao seu dispor, resultando num feroz e terrível embate entre estes dois adversários. O guião é assinado por Patrick Aison e conta com um elenco composto por Amber Midthunder, Dakota Beavers, Stormee Kipp, Michelle Thrush e Julian Black Antelope. Insaciável curioso e consumidor de literatura, videojogos, cinema e anime. Tem preferência por uma boa história. Podes segui-lo em @Riuuzaki_23.",
        "image": "https://sm.ign.com/t/ign_pt/news/p/prey-is-hu/prey-is-hulus-biggest-premiere-ever_bvdr.1200.jpg",
        "url": "https://pt.ign.com/predator-5/115523/news/prey-e-a-maior-estreia-de-sempre-no-hulu",
        "score": 0,
        "categoryId": 37,
        "createdAt": "2022-08-11T02:59:57.748Z",
        "publicatedAt": "2022-08-10 01:04:25"
      },
      {
        "id": 4,
        "title": "JoJo's Stone Ocean pode ter dado pista do lançamento da Parte 3",
        "description": "Pular para o conteúdo As datas de lançamento dos Blu-rays de JoJo's Bizarre Adventure: Stone Ocean podem ter dado uma pista da janela de lançamento da Parte 3 do anime.Ainda que a Parte 3 não tenha sido oficialmente confirmada, os fãs esperam pela continuação, considerando que ainda há muito do mangá para ser adaptado. O site oficial de JoJo's Bizarre Adventure confirmou que uma terceira caixa de Blu-ray para Stone Ocean chegará em maio do ano que vem, o que dá a entender que a espera pela terceira parte da série será muito menor do que o intervalo entre a primeira e a segunda temporadas.Confira abaixo as datas de lançamento dos BOX Blu-ray de JoJo's Bizarre Adventure: Stone Ocean:— STICKER ⋆ ⁽ᴶᴶᴮᴬ₋ᴺᴱᵂˢ⁾ (@StickerTricker) August 10, 2022VEJA MAISJoJo's Bizarre Adventure é uma famosa criação de Hirohiko Araki, que conta com um uma adaptação em anime recente na Netflix, chamada Stone Ocean. A segunda parte do anime, que vai dos episódios 13 ao 24, será lançada no dia 1º de setembro.Flórida, EUA, 2011. Jolyne Cujoh é presa e sentenciada a 15 anos de prisão depois de se envolver em um acidente de carro com seu namorado. Ela acaba na Prisão de Green Dolphin Street, também conhecida como ‘O Aquário'.Devastada, Jolyne segura o pingente de seu pai na mão quando um estranho poder desperta nela. ‘Existem destinos piores que a morte e as pessoas desta prisão estão encarando tais destinos'. Ela recebe esta mensagem de um garoto misterioso.Eventos inexplicáveis acontecem um após o outro. Enquanto a visita, Jotaro Kuko revela a terrível verdade sobre um homem chamado Dio. 06 de agosto de 2022 06 de julho de 2022 04 de julho de 2022 02 de julho de 2022 Este site usa cookies para garantir uma melhor experiência. Ao continuar a navegar, você está de acordo com isso. Para saber mais, acesse: Política de privacidade.",
        "image": "https://ovicio.com.br/wp-content/uploads/2022/08/20220810-fzz6zklxwameq9n.jpg",
        "url": "https://ovicio.com.br/jojos-stone-ocean-pode-ter-dado-pista-do-lancamento-da-parte-3/",
        "score": 0,
        "categoryId": 37,
        "createdAt": "2022-08-11T02:59:57.730Z",
        "publicatedAt": "2022-08-10 18:37:09"
      },
      {
        "id": 2,
        "title": "Criador de Tower of God quebra o silêncio sobre a segunda temporada",
        "description": "Desde o final da primeira temporada de Tower of God em 2020, poucas informações sobre o anime foram compartilhadas, mas novidades começaram a surgir. De acordo com o site ComicBook, este mês o Webtoon e Crunchyroll confirmaram que a segunda temporada estava em andamento. E agora, SIU, o criador da história compartilhou uma mensagem para o fãs. Confira: 'Parece que a primeira temporada da animação saiu ontem, mas agora terei a chance de ver todos vocês novamente na segunda temporada! Sou muito grato a toda a equipe de produção do anime, bem como aos leitores, e mal posso esperar para ver como a segunda temporada vai acabar. Obrigado, como sempre, por todo o seu apoio!' Até agora, não há detalhes sobre a história da segunda temporada de Tower of God, nem data de lançamento, sabe-se apenas que será transmitida no Crunchyroll. De acordo com a sinopse, o desenho conta a história de Bam, um menino inocente e sem memória, cuja única amiga é uma garota chamada Rachel. Quando Rachel decide entrar em uma torre misteriosa em busca de realizar um desejo, Bam tenta impedi-la. Antes de desaparecer nos portões da torre diante de seus olhos, Rachel adverte Bam para esquecer tudo sobre ela. Não querendo perdê-la, Bam entra na torre completamente cercado por Shinsu, uma água divina e mágica, por sua própria conta e risco. A torre contém inúmeros andares tão vastos quanto continentes, cada um com sua geografia, idioma e cultura únicos. Confrontado por testes habilidosos a cada passo do caminho, Bam encontra guardiões poderosos e ambientes sobrenaturais, tornando sua busca pelo topo uma tarefa difícil. Bam em Tower of God (Reprodução) Tower of God começou a ser publicado em 2010 pela Webtoon e continua em lançamento. A história é voltada para o público shonen, ou seja, jovens entre 12 a 18 anos. A primeira temporada do anime conta com 13 episódios. Tower of God é um manhwa, uma versão coreana do mangá japonês, e a história foi traduzida em diversas línguas como como japonês, espanhol e português. Um curiosidade sobre as várias traduções é que os personagens ganharam diferentes nomes, Rachel se tornou Lahel, Koon também era chamado de Khun/Kun e Zahard também era chamado de Jahad. Além da animação, Tower of God ganhou uma adaptação em jogo para celulares, em 2016 ficou entre os cinco jogos mais populares do Google Play. O que você achou? Siga @siteepipoca no Instagram para ver mais e deixar seu comentário clicando aqui. Formado em Administração e Psicologia, e também fez curso de desenho. Fã de games, desenhos animados, séries e filmes.",
        "image": "https://epipoca.com.br/wp-content/uploads/2022/08/bam-tower-of-god-.jpg",
        "url": "https://epipoca.com.br/?p=1004806",
        "score": 0,
        "categoryId": 37,
        "createdAt": "2022-08-11T02:59:57.719Z",
        "publicatedAt": "2022-08-10 18:27:47"
      },
      {
        "id": 61,
        "title": "Santander tem NOVAS vagas de emprego pelo país",
        "description": "Por Michele Azevedo ultima atualização 13/08/2022 às 18:23 O Santander, destaque bancário no país, está anunciando novos empregos em diversas regiões do Brasil. São vários cargos que proporcionam benefícios diversos e salários compatíveis com o mercado. Veja as opções abertas, neste momento. Imagem: Santander – Reprodução Santander tem vagas de emprego pelo Brasil A empresa bancária está divulgando os cargos, a seguir, considerando como público alvo os profissionais qualificados e comprometidos com o sucesso de suas atividades. Anl Planejamento Financeiro (Exclusivo para PCD);Anl Rec Humanos SR (Treinamento e Desenvolvimento);Anl Tecnologia e Operações (PCD);Analista administrativo/ Consórcio (Exclusivo para PCD);Anl Tecnologia e Operações Pleno (Python/ PySpark);Analista de Tecnologia e Operações (Dados);Gerente de Empresas II – Polo Paulista – São Paulo/SP;Anl Tecnologia e Operações Pleno (DMPS);Gerente de Empresas I – Guaraí/TO;Gerente de Empresas I – Goiânia/GO;Gerente de Empresas II – Lauro de Freitas / BA;Analista Sênior de Dados;Anl Riscos Varejo III (Indicadores);Anl Tec e Operações Senior (Data Viz);Anl Tec e Operações Senior (Riscos PF e Cartoes);Anl Tec e Operações Senior (Telemetria de Motores);Anl Tecnologia e OperaçõesAnalista desenvolvedor SêniorGerente de Negócios e Serviços – EXCLUSIVA PARA PCD – SANTANDERGerente de Empresas II – Polo Jardins – São Paulo/SPGerente de Negócios e Serviços I – Araçatuba/SP (Exclusiva para pessoas com deficiência)Anl Tecnologia e Operações (Gestão de Projetos e Melhoria de Processos)Anl Tecnologia e Operações (PCD)Anl Tecnologia e Operações (Projetos)Assistente Comercial Prospera – Exclusiva para Pessoa com deficiência*Banco de Talentos para área de RiscosGerente de Empresas II (Expansão) – Rondonópolis/MTBRA Anl Tecnologia e Operações Pleno (Telemetria de Motores)Gerente de Empresas II – Polo Ibirapuera – São Paulo/SPGerente de Negócios e Serviços I – Bauru/SP (Exclusiva para pessoas com deficiência)Gerente de Empresas II – Polo República – São Paulo/SP. Veja também: Petz abre vagas de emprego para todo o país Como se candidatar Para efetuar a inscrição no processo seletivo do Santander, os interessados podem acessar a página, selecionar a vaga pleiteada e cadastrar currículo. É importante observar os critérios exigidos para cada cargo. Saiba mais sobre os empregos da semana, divulgados em primeira mão aqui no Notícias Concursos. Acompanhe diariamente as atualizações com processos seletivos de grandes empresas. Veja o que é sucesso na Internet: oportunidadessantandervagas de emprego Formada em Letras - Português/ Inglês, e idealizadora do site Escritora de Sucesso, busca expandir o conhecimento de todos com informações relevantes sobre diversos assuntos, enquanto redatora. No Notícias Concursos, divulga vagas de empregos diárias que possibilitam a sociedade a encontrar oportunidades em primeira mão.",
        "image": "https://noticiasconcursos.com.br/wp-content/uploads/2021/04/noticiasconcursos.com.br-santander-divulga-mais-de-1-mil-estagios-com-remuneracao-alta-santander-divulga-programa-de-estagios.jpg",
        "url": "https://noticiasconcursos.com.br/santander-tem-novas-vagas-de-emprego-pelo-pais/",
        "score": 0,
        "categoryId": 43,
        "createdAt": "2022-08-14T21:33:29.442Z",
        "publicatedAt": "2022-08-13 21:53:39"
      },
      {
        "id": 62,
        "title": "Criador de Watchmen, série da DC, revela o que ele acha ser o maior problema dos filmes da Marvel",
        "description": "Ele foi bem sincero! 12/08/2022 Conhecido por comandar Watchmen, a aclamada série da DC Comics que continua os eventos da clássica HQ de Alan Moore, Damon Lindelof foi extremamente sincero ao apontar qual é o principal problema dos filmes do Universo Cinematográfico Marvel. O roteirista, diretor e produtor abriu o coração e explicou o motivo de estar saturado com este modelo de negócios. Questionado pela Vulture, Lindelof reforçou que assiste a todos os filmes do MCU e compreende como a indústria do entretenimento funciona. Apesar disso, ele gostaria que houvessem menos lançamentos para que, dessa forma, cada projeto fosse especial.'De um ponto de vista ligeiramente mais cínico, são apenas negócios. É uma indústria. E se você faz alguns filmes incríveis da Marvel, o instinto é ‘nós temos que fazer mais filmes da Marvel, precisamos expandir isso.' E eu tenho uma espécie de sensação que fica tipo ‘Uau, eu gostaria que eles fizessem menos, porque isso faria com que cada lançamento fosse um pouco mais especial'. Mas eu assisto todos eles. Todos eles,' disse. 'As pessoas não querem que as coisas acabem, mas eu sim.' Série de Watchmen foi extremamente bem recebida pelos críticos e fãs da HQ.Lindelof, no entanto, não se incomoda com eles continuarem lucrando com o sucesso do MCU:'Eu não me irrito com eles continuarem [lançando filmes]. Eu fiz prequels e sequels e reboots, então eu não posso ser hipócrita e dizer ‘Deus, tenha uma ideia original' enquanto estou fazendo dois filmes de Star Trek e Prometheus.'  E aí, você concorda com ele?Veja também:",
        "image": "https://kanto.legiaodosherois.com.br/w728-h381-gnw-cfill-gcc-f:fbcover/wp-content/uploads/2022/08/legiao_NFb95gaTqHuX.jpg.webp",
        "url": "https://www.legiaodosherois.com.br/2022/criador-watchmen-serie-revela-maior-problema-filmes-marvel.html",
        "score": 0,
        "categoryId": 45,
        "createdAt": "2022-08-14T21:33:29.447Z",
        "publicatedAt": "2022-08-13 02:00:37"
      },
      {
        "id": 63,
        "title": "Tecnologia da vacina contra a Covid-19 é estudada para prevenção ao HIV e combate ao câncer, com pesquisas no Brasil",
        "description": "Agora, que além de consolidada e segura a tecnologia se mostrou altamente eficaz, já estão em testes estratégias com a técnica para a prevenção inédita de doenças como HIV, zika, ebola, herpes, além de novas vacinas mais eficazes para tuberculose, malária, dengue e gripe. Há até mesmo estudos promissores que implementam o RNAm para o combate ao câncer e de diagnósticos como diabetes e anemia falciforme. Os pesquisadores traçam um cenário otimista para grandes avanços científicos na próxima década. E o Brasil deve ganhar destaque com a produção própria de imunizantes e terapias que adotam a tecnologia. Na Bahia, já é desenvolvida uma nova vacina contra a Covid-19 que utiliza a plataforma, por cientistas do Senai Cimatec, que está em testes clínicos. Em 2021, Bio-Manguinhos, da Fiocruz, foi escolhido pela Organização Mundial de Saúde (OMS) como parte de uma seleção mundial para incentivar a criação de imunizantes com o RNAm. Além de também desenvolver uma nova vacina para a Covid-19 com a tecnologia, o instituto pesquisa terapias para câncer e prevenção de outras doenças. — Nós estávamos trabalhando com tecnologia de RNAm por alguns anos, principalmente focado em vacinas terapêuticas para o tratamento do câncer, mas com a pandemia passamos também a desenvolver nossa própria vacina para a Covid-19 de RNAm, que está em testes. Essa tecnologia estava em estudos há décadas, mas deu esse salto com a crise sanitária e se mostrou de fato muito eficaz. Agora esperamos que vamos ter resultados positivos semelhantes com outras doenças — afirma o vice-diretor de Desenvolvimento Tecnológico de Bio-Manguinhos, Sotiris Missailidis. As altas expectativas que envolvem o RNA mensageiro se dão por alguns fatores. O primeiro deles é a forma de atuação. Basicamente, trata-se de um código com instruções para que as células do corpo produzam determinada proteína. No caso das vacinas da Covid-19, em vez de o imunizante introduzir o vírus inativado ou uma parte dele para que o sistema imunológico produza as defesas, o RNAm utiliza o próprio organismo como 'fábrica' da proteína S do coronavírus, que então é lida pelo corpo para produzir as células de defesa e anticorpos. — Sem dúvida o RNAm revolucionou a vacinologia, porque você consegue através de um código levar o indivíduo que recebe a vacina a produzir a própria proteína. Isso é uma revolução porque permite que produzamos proteínas contra qualquer coisa, então anticorpos contra alguma doença, proteínas que inviabilizam tumores, doenças degenerativas. Em teoria, a tecnologia é aplicável para diabetes, Alzheimer, câncer, não apenas doenças infecciosas. É uma esperança para muitas outras doenças que até então nós ou não temos vacina ou que precisamos de alternativas melhores — explica o infectologista e diretor da Sociedade Brasileira de Imunizações (SBIm), Renato Kfouri. Ele conta que, desde 1990, a plataforma é estudada, mas era considerada instável em testes. A situação mudou em 2005, quando uma equipe de pesquisadores americanos desenvolveu cápsulas de gordura, chamadas de lipossomos, que envolvem o RNAm e conseguem levá-lo integralmente ao organismo. Um dos cientistas responsáveis pela descoberta escreveu inclusive um artigo na revista científica Nature Reviews Drug Discovery, em 2018, intitulado 'Vacinas de RNAm - Uma nova era na vacinologia', em que listou uma série de estudos com resultados promissores da tecnologia. Além do amplo potencial, as vacinas de mRNA têm demonstrado eficácia superior aos modelos convencionais e têm um potencial para fabricação com menor custo. Isso porque, pela plataforma ser sintética, e não envolver vírus vivos, não exige, por exemplo, um laboratório de biossegurança. Além disso, podem ser desenvolvidas e adaptadas de forma mais rápida, o que possibilitou que os imunizantes da Covid-19 tivessem os testes clínicos iniciados menos de seis meses após o Sars-CoV-2 ter sido descoberto na China, em 2019. Um dos resultados mais aguardados para a nova geração de vacinas que começam a ser testadas é a do imunizante contra o HIV. Neste ano, a Moderna – farmacêutica criada com foco no RNAm e responsável por uma das vacinas da Covid-19 – deu início à fase 1 dos testes clínicos com algumas candidatas. Estão também na primeira etapa os estudos com um imunizante para o Nipah henipavírus (NiV), patógeno altamente letal, originalmente de animais, que provoca surtos pontuais em humanos na Índia e em Bangladesh. Porém, essas não devem ser as próximas a saírem do papel. O laboratório conduz ainda testes com uma vacina para o vírus da Zika, que já estão em fase 2, e para uma nova versão do imunizante contra o vírus Influenza, causador da gripe, que está na fase 3. Há também estudos para versões conjuntas de vacina da gripe com a da Covid-19 e uma proteção para o vírus sincicial respiratório (VSR), microrganismo que causa um alto número de hospitalizações e óbitos em crianças pequenas e ainda não pode ser combatido com imunizantes. Potencial de produção no Brasil Missailidis, da Fiocruz, destaca que, embora a produção de vacinas com a nova tecnologia esteja começando principalmente em países do exterior, eventualmente Bio-manguinhos pode se tornar autônomo na fabricação de terapias com RNAm. — Nosso maior problema era ter a capacidade de desenvolver novas tecnologias sem depender dos Estados Unidos, da Europa, de países que normalmente chegam com os produtos primeiro e depois fazem uma transferência de tecnologia. O esforço que estamos fazendo nesse momento é para mudar esse paradigma. E nós podemos usar o RNAm para doenças raras, doenças negligenciadas, que muitas vezes não são de interesse de grandes farmacêuticas, mas que a Fiocruz, como uma instituição pública, tem a missão de poder atender essa parte da população — diz o vice-diretor de Desenvolvimento Tecnológico de Bio-manguinhos. O novo imunizante da Fiocruz para a Covid-19 de RNAm, que deve começar os testes clínicos no início do ano que vem, tem ainda o diferencial de despertar a resposta imune não apenas com a proteína S do coronavírus, mas também a N. Segundo Sotiris, a segunda proteína é mais conservada, então espera-se que ofereça uma maior imunidade para proteger contra novas variantes. Há também o desenvolvimento da tecnologia pelo Senai Cimatec, na Bahia, em parceria com a empresa HDT Bio Corp, dos Estados Unidos. O infectologista e pesquisador-chefe da instituição, Roberto Badaró, que lidera a pesquisa, explica que a vacina de RNAm utiliza ainda uma nanopartícula inédita capaz de proteger a molécula e aumentar a absorção no organismo, e celebra o projeto como um passo importante para o domínio da plataforma no Brasil. — Hoje nós temos capacidade de fabricar essa vacina aqui no Brasil, nós incorporamos essa tecnologia lá no Senai Cimatec e estamos terminando os estudos de fase 1. É uma revolução grande essa plataforma, então nós estamos muito animados que o Brasil vai ter uma participação competitiva no cenário internacional de uma vacina moderna — afirma Badaró. Ele conta que há um imunizante com a tecnologia também em testes para leishmaniose, uma doença provocada por um protozoário e transmitida por mosquitos que, se não tratada, pode ser altamente fatal. — São milhares de pessoas que adquirem leishmaniose no Brasil e na América Latina, que é uma doença desfigurante que, quando pega a mucosa nasal, destrói o nariz, sendo uma doença séria, mas que não tem muita atenção por ser tropical. Só que essa tecnologia irá nos ajudar a fazer várias outras vacinas contra outras doenças — acrescenta o infectologista. Nova arma contra o câncer Badaró, do Senai Cimatec, conta que há ainda vacinas terapêuticas em desenvolvimento na instituição para câncer de mama, próstata e ovário, que devem ganhar fôlego após o fim dos testes com o imunizante para a Covid-19. O combate a tumores é de fato uma das grandes promessas para o avanço da tecnologia, explica o médico oncologista e professor da Universidade Nove (Uninove), em São Paulo, Ramon Andrade de Mello. — A expectativa da utilização do RNAm no tratamento do câncer é muito alta. Existem estudos com resultados muito promissores para o uso da tecnologia para que o próprio organismo produza proteínas que atuem com o sistema imune para combater o câncer de uma maneira mais eficaz — explica o especialista, que faz parte do corpo clínico do Hospital Albert Einstein, também em São Paulo. Isso porque o câncer desenvolve uma proteína chamada de inibidora de checkpoint, que diz ao organismo que aquelas células são saudáveis, embora sejam cancerígenas – o que impede que o sistema imunológico combata o tumor. Porém, o oncologista explica que, com o RNAm, seria possível ensinar as células de defesa a reconhecerem a tal proteína, e então passarem a atacá-la. Em junho de 2021, a BioNTech – que desenvolveu um dos imunizantes para a Covid-19 junto à Pfizer – anunciou que tratou o primeiro paciente com uma vacina de RNAm contra o câncer de pele, durante estudos clínicos da fase 2. — Há uns 20 anos, o tratamento do câncer era muito voltado à quimioterapia, mas da última década para cá as novas tecnologias têm mudado a resposta ao problema. Cada vez mais, vamos chegando a melhores resultados e mais próximo de uma possível cura do câncer, ainda que seja um caminho complexo até lá. Para isso, o desenvolvimento de novas terapias, como o RNAm, é essencial. Creio que de 5 a 10 anos, vamos ter a plataforma incorporada às diretrizes médicas. Com certeza é uma tecnologia que merece atenção e investimento — afirma o oncologista.",
        "image": "https://s2.glbimg.com/Hr_A0XnoYh9HvWKya-q9HyrhazM=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2022/A/b/mxXgfHSaq0NFs7fEcBSw/7515767508-229b97051a-k.jpg",
        "url": "https://oglobo.globo.com/saude/vacina-e-saude/noticia/2022/08/tecnologia-da-vacina-contra-a-covid-19-e-estudada-para-prevencao-ao-hiv-e-combate-ao-cancer-com-pesquisas-no-brasil.ghtml",
        "score": 0,
        "categoryId": 43,
        "createdAt": "2022-08-14T21:33:29.449Z",
        "publicatedAt": "2022-08-14 08:45:00"
      },
      {
        "id": 59,
        "title": "Santander tem NOVAS vagas de emprego pelo país",
        "description": "O Santander, destaque bancário no país, está anunciando novos empregos em diversas regiões do Brasil. São vários cargos que proporcionam benefícios diversos e salários compatíveis com o mercado. Veja as opções abertas, neste momento. Imagem: Santander – Reprodução Santander tem vagas de emprego pelo Brasil A empresa bancária está divulgando os cargos, a seguir, considerando como público alvo os profissionais qualificados e comprometidos com o sucesso de suas atividades. Anl Planejamento Financeiro (Exclusivo para PCD); Anl Rec Humanos SR (Treinamento e Desenvolvimento); Anl Tecnologia e Operações (PCD); Analista administrativo/ Consórcio (Exclusivo para PCD); Anl Tecnologia e Operações Pleno (Python/ PySpark); Analista de Tecnologia e Operações (Dados); Gerente de Empresas II – Polo Paulista – São Paulo/SP; Anl Tecnologia e Operações Pleno (DMPS); Gerente de Empresas I – Guaraí/TO; Gerente de Empresas I – Goiânia/GO; Gerente de Empresas II – Lauro de Freitas / BA; Analista Sênior de Dados; Anl Riscos Varejo III (Indicadores); Anl Tec e Operações Senior (Data Viz); Anl Tec e Operações Senior (Riscos PF e Cartoes); Anl Tec e Operações Senior (Telemetria de Motores); Anl Tecnologia e Operações Analista desenvolvedor Sênior Gerente de Negócios e Serviços – EXCLUSIVA PARA PCD – SANTANDER Gerente de Empresas II – Polo Jardins – São Paulo/SP Gerente de Negócios e Serviços I – Araçatuba/SP (Exclusiva para pessoas com deficiência) Anl Tecnologia e Operações (Gestão de Projetos e Melhoria de Processos) Anl Tecnologia e Operações (PCD) Anl Tecnologia e Operações (Projetos) Assistente Comercial Prospera – Exclusiva para Pessoa com deficiência* Banco de Talentos para área de Riscos Gerente de Empresas II (Expansão) – Rondonópolis/MT BRA Anl Tecnologia e Operações Pleno (Telemetria de Motores) Gerente de Empresas II – Polo Ibirapuera – São Paulo/SP Gerente de Negócios e Serviços I – Bauru/SP (Exclusiva para pessoas com deficiência) Gerente de Empresas II – Polo República – São Paulo/SP. Veja também: Petz abre vagas de emprego para todo o país Como se candidatar Para efetuar a inscrição no processo seletivo do Santander, os interessados podem acessar a página, selecionar a vaga pleiteada e cadastrar currículo. É importante observar os critérios exigidos para cada cargo. Saiba mais sobre os empregos da semana, divulgados em primeira mão aqui no Notícias Concursos. Acompanhe diariamente as atualizações com processos seletivos de grandes empresas. Formada em Letras – Português/ Inglês, e idealizadora do site Escritora de Sucesso, busca expandir o conhecimento de todos com informações relevantes sobre diversos assuntos, enquanto redatora. No Notícias Concursos, divulga vagas de empregos diárias que possibilitam a sociedade a encontrar oportunidades em primeira mão. Fonte: Notícias Concursos",
        "image": "https://noticiasconcursos.com.br/wp-content/uploads/2021/07/noticiasconcursos.com.br-noticiasconcursos.com_.br-michele-azevedo-640x640-1-150x150.jpg",
        "url": "https://boainformacao.com.br/2022/08/santander-tem-novas-vagas-de-emprego-pelo-pais/",
        "score": 0,
        "categoryId": 43,
        "createdAt": "2022-08-14T21:33:29.435Z",
        "publicatedAt": "2022-08-14 10:44:59"
      },
      {
        "id": 60,
        "title": "HaHa Art: Cineclube de Pombal cria o primeiro festival português de cinema de comédia",
        "description": "As sessões competitivas decorrerão entre 18 e 20 de novembro, com 40 filmes nacionais e internacionais a concurso. Em Portugal realizam-se vários festivais de cinema, como o IndieLisboa, o Porto/Post/Doc, o Cinanima, FilmFest, MOTELX, entre muitos outros. Contudo, ainda não existia nenhum evento focado nos filmes de comédia, género no seio do qual não costumam despontar muitas obras-primas da cinematografia, mas apreciado por todos pelas gargalhadas que proprociona. Pombal decidiu revolucionar o panorama nacional e criou o HaHa Art, focado nestas produções humorísticas. 'Há uma série de festivais, alguns temáticos, mas a maioria são generalistas. E a comédia parece que não existe. Em Portugal e também a nível mundial, porque não há muitos festivais que lhe sejam dedicados', conta Carlos Calika, o organizador, à 'Lusa', citado pelo 'Observador'. Organizada pelo CineClube, a iniciativa quer colocar Pombal no mapa cinematográfico com através de algo que não se vê noutros locais, ao mesmo tempo que valorizam a comédia e apoiam o cinema nacional. Segundo Carlos Calika, a criação de um filme que faz os espectadores rir é uma arte. 'Não é só a piada fácil, o sketch, a queda, o ridículo. Há vários tipos de humor e o inteligente é o mais difícil de fazer', confessa. As candidaturas abriram no início de julho e o feedback tem sido 'avassalador'. 'Já temos quase 200 filmes de cerca de 30 países', revela. A maioria vem de Espanha, Estados Unidos e China, mas também algumas produções da Islândia, Chile, Arménia, Irão, entre outros. Apesar da forte adesão, a organização lamenta o baixo número de projetos nacionais. 'Nota-se o reflexo das diferentes sociedades. Há aspetos que supostamente são humor nos países de origem e nós não o entendemos como tal. É uma questão cultural.' As seis sessões competitivas com 40 filmes a concurso decorrerão entre 18 e 20 de novembro, no Auditório Municipal e no Teatro-Cine de Pombal. Serão distinguidos os melhores filmes e realizadores nacionais e internacionais, e um galardão atribuído pelo público.",
        "image": "https://www.nit.pt/wp-content/plugins/mm_og_image/mm_og_image.php?post_id=929901&ts=20220813180858",
        "url": "https://www.nit.pt/cultura/cinema/haha-art-cineclube-de-pombal-cria-o-primeiro-festival-portugues-de-cinema-de-comedia",
        "score": 0,
        "categoryId": 45,
        "createdAt": "2022-08-14T21:33:29.438Z",
        "publicatedAt": "2022-08-13 16:50:00"
      },
      {
        "id": 64,
        "title": "O Senhor dos Anéis l Por que diretor quis fazer hipnotismo para esquecer os filmes?",
        "description": "O diretor Peter Jackson, que dirigiu os três filmes de O Senhor dos Anéis, confessou que quase se submeteu ao hipnotismo para esquecer os filmes. Segundo ele, por saber tudo que aconteceria na produção, ele queria esquecer para viver a experiência do zero. Peter também declarou que, em enquanto diversas pessoas se emocionaram e se surpreenderam com a história dos filmes, ele quis fazer hipnose para esquecer de tudo e ter a mesma sensação dos fãs. 'Quando nós fizemos os filmes de O Senhor dos Anéis, eu senti que eu era a pessoa mais azarada do mundo que nunca conseguia ver o filme sem ter conhecimento sobre ele. Quando os filmes foram exibidos, eu já estava imerso nisso por uns cinco ou seis anos. Foi uma grande perda para mim não ser capaz de ver como qualquer outra pessoa', afirmou o diretor em entrevista ao The Hollywood Reporter. 'Na verdade eu considerei seriamente ir em busca de algum cara para me hipnotizar e me fazer esquecer sobre os filmes e o trabalho que eu havia feito nos últimos seis ou sete anos, para que eu pudesse sentar e curtir os filmes. Eu não segui com esse plano, mas eu cheguei a falar com o [psicólogo Britânico] Derren Brown sobre isso e ele achou que seria capaz de fazer.', completou. Cena de O Senhor dos Anéis (Reprodução) O primeiro filme estreou há duas décadas: O Senhor dos Anéis e as Duas Torres (2002) e foi muito aclamado pela crítica. A sequência chegou em 2003, O Senhor dos Anéis: O Retorno do Rei. E o terceiro filme estreou em 2012, O Hobbit: Uma Jornada Inesperada. Os filmes foram uma adaptação da trilogia dos livros originais, O Senhor dos Anéis, escritos entre os anos de 1937 e 1949, do escritor britânico J. R. R. Tolkien. Os livros de fantasia são os mais vendidos em todo o mundo e a história é baseada na luta entre o bem e o mal pela posse de um anel mágico. Além das obras literárias baseadas e dos três filmes lançados, a história também foi para o universo dos games com Dragon Quest, Ultima, EverQuest, Warcraft , The Elder Scrolls e o famoso Dungeons & Dragons, entre outros. Gollum, interpretado por Andy Serkis em O Senhor dos Anéis (Reprodução) O Senhor dos Anéis: Os Anéis do Poder estreia em 2 de setembro de 2022 E para quem é fã do clássico, poderá reviver a emoção da história com a série derivada O Senhor dos Anéis: Os Anéis do Poder. A produção não terá Peter Jackson na direção, mas sim o Juan Antonio Bayona, diretor dos dois primeiros episódios. A previsão é que a série chegue na Prime Video no dia 2 do próximo mês. Confira o trailer: O que você achou? Siga @siteepipoca no Instagram para ver mais e deixar seu comentário clicando aqui. Sou a Raio de Luar, mineira, jornalista, especializada em marketing e fotógrafa. Apaixonada pela escrita, por livros, filmes, séries e por tudo que a arte pode nos proporcionar.",
        "image": "https://epipoca.com.br/wp-content/uploads/2021/07/pippin-merry-3007.jpg",
        "url": "https://epipoca.com.br/?p=1005384",
        "score": 0,
        "categoryId": 45,
        "createdAt": "2022-08-14T21:33:29.451Z",
        "publicatedAt": "2022-08-14 14:01:35"
      }
    ]
</p>
</details>

## Votar
É possivel votar como HOT para noticias interessantes ou COLD para noticias desinteressantes. Cada voto COLD anula um HOT
### Request
`Get /vote` <br/>

Rota:

    localhost:5000/vote

Header:

    Bearer <Token>

body:

  `id da noticia e tipo do voto`


    {
      "newsId": 8,
      "type":"COLD"
    }
### Response
#### Se tudo ocorreu bem:

    Status: 200 OK
    Size: 2 Bytes
    Time: 27 ms

#### Se há alguma informação incorreta:

    Status: 500 Internal Server Error
    Size: 120 Bytes
    Time: 12 ms

## Deletar um voto

### Request
`DELETE /vote/idDaNoticia`
Rota:

    localhost:5000/vote/3

### Response
#### Se tudo ocorreu bem:

    Status: 200 OK
    Size: 2 Bytes
    Time: 27 ms

#### Se há alguma informação incorreta:

    Status: 500 Internal Server Error
    Size: 120 Bytes
    Time: 12 ms

