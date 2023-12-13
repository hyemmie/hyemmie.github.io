---
title: StarkWare Sessions 2023 wrap up (KR)
date: 2022/02/16
description: 라디우스 팀에서 텔아비브에서 열린 스타크웨어 세션 내용 요약 및 리뷰를 공유합니다.
tag: StarkWare, Ethereum, ZKP, Layer 2
author: You
---

> Radius Labs 소속으로 작성했던 글을 옮겨 업로드함을 밝힙니다.

라디우스 팀에서 텔아비브에서 열린 스타크웨어 세션 내용 요약 및 리뷰를 공유드립니다.

Radius is a trustless, zero-knowledge-based sequencing layer. Rollups can use the Sequencing-as-a-Service (SaaS) offered by Radius to sequence transactions and protect users from censorship and harmful MEV. Through atomic and seamless bridging, traders can efficiently trade for cross-rollup arbitrage within the sequencing layer ecosystem.

- Twitter: https://twitter.com/radius_xyz
- Litepaper: https://docsend.com/view/ybwgf63brvja82si

![SS image](/images/posts/ss1.png)

라디우스 팀이 스타크웨어 세션에 참석해 피칭을 진행했습니다. 현장에서 세션을 듣고 요약, 리뷰한 내용을 공유드립니다. 각 세션이 약 20분 정도의 분량이었으며 deep dive 대신 소개의 성격을 가지고 있는 경우가 많았습니다.

아래 요약이 전체 세션을 다루고 있지는 않으며, 팀과 관련있는 세션들을 선정해서 참여했음을 미리 알려드립니다.

\*본문에서 사용된 이미지 자료의 출처는 [스타크웨어 유튜브](https://www.youtube.com/channel/UCnDWguR8mE2oDBsjhQkgbvg)임을 명시합니다.

## About StarkWare

_스타크넷의 현재와 미래에 대해 논하는 세션들이 주를 이루었습니다._

> “Starknet decentralization” — Ilia Volokh from StarkWare

스타크넷을 탈중앙화한다는 것은 탈중앙화된 프로토콜을 구축하고 탈중앙화된 의사결정 프로세스를 갖춘다는 것을 뜻합니다. 이 세션에서는 의사결정, 즉 거버넌스에 대해서는 다루지 않고 (“[Starknet Governance](https://www.youtube.com/watch?v=GKSGuwdU95Y)” — Sylve Chevet 에서 다루었다고 합니다) 탈중앙화된 프로토콜 구축에 집중했습니다.

![Starknet flow](/images/posts/ss2.png)

이더리움과 다르게 스타크넷은 트랜잭션을 선정하고 전파하는 `sequencer`와 이 트랜잭션을 실행하고 증명을 생성하는 `prover`가 존재하며, 탈중앙화된 프로토콜을 구축하기 위해서는 이 두 운영 레이어를 분산시켜야 합니다. 탈중앙화된 스타크넷 프로토콜이란 다음의 요소들을 모두 갖춘 프로토콜을 뜻합니다.

먼저 탈중앙화된 sequencer 레이어와 이들의 컨센서스 프로토콜을 갖추어야 합니다. 마찬가지로 탈중앙화된 prover 레이어와 증명의 분산화, 트랜잭션 fee 메커니즘, 보상 체계와 토크노믹스를 구축해야 합니다. 스타크넷은 이것들을 갖추기 위하여 처음에는 하나의 완전한 프로토콜 후보들을 제시하는 방식으로 개발을 진행했지만, 완벽한 모델을 구상하는 데에 한계가 있어 이후 각개전투(devide and conquer) 방식으로 한 번에 하나씩만 집중하며 문제를 명확히 이해하도록 노력했다고 합니다. 그리고 프로토콜을 L2 컨센서스, proof 프로덕션, L1 state update의 세 단계로 나누었습니다. 가장 빠른 prover가 생성한 proof가 선택될지, prover는 어떻게 선정되는지, 수수료 체계는 어떻게 되는지와 같은 세부적인 design choice는 아직 이루어지지 않았습니다.

스타크웨어의 로드맵은 `functionality` → `performance` → `decentralization`이라고 합니다. Cairo VM과 스타크넷 구축에 집중했던 스타크웨어는 performance 개선과 함께 이제야 탈중앙성을 고려하기 시작했습니다. 이후에는 세련된 탈중앙화 구조를 제시하고 유저들을 설득하며 끌어모으는 것이 아니라, 커뮤니티를 먼저 강화한 후 커뮤니티를 통해 여러 design choice를 정할 것이라 합니다.

![decentralization roadmap](/images/posts/ss3.png)

세션도 _‘No Decentralization Without “U”’_ 슬라이드와 함께 마무리되었습니다. 커뮤니티를 활성화하고 탈중앙화 문제를 신중하게 풀어가려는 의지가 느껴졌습니다.

> “StarkNet Community Update” — Tom Brand from StarkWare

스타크넷 커뮤니티에 새로 업데이트해야 할 사항으로 세 가지를 제시했습니다.

1. Release of Cairo 1.0

Cairo 1.0 정식 릴리즈에 앞서 alpha 2 버전이 발표되었는데, 아직 안정적이지는 않지만 매우 아름답다며(?) 자신감을 드러냈습니다. alpha 2 버전으로는 ERC20 컨트랙트를 작성할 수 있지만 아직 스타크넷에 배포할 수 없습니다. Cairo는 프로그래밍 언어이고 스타크넷은 블록체인, 즉 시스템이기 때문에 이들의 개발은 완전히 독립적인 문제입니다. 스타크웨어 측에서 Cairo 1.0 버전의 개발과 동시에 Cairo 1.0을 지원할 수 있도록 스타크넷을 업데이트하고 있다고 합니다.

2. Seamless Regenesis

전체 스타크넷 스택을 Cairo 0.x에서 Cairo 1.0 으로 전환하게 되는 작업을 Regenesis라고 합니다. 이를 위해 Cairo 1.0 을 배포하기 전까지 해야 할 일은 Cairo 0.x로 작성한 모든 코드를 Cairo 1.0으로 포팅할 수 있도록 개발하는 것입니다. 이후 생태계의 개발자들이 할 일은 단순히 Cairo 1.0의 문법으로 컨트랙트 코드를 수정하는 일뿐입니다.

3. Performance Improvement (especially throughput)

스타크넷의 과거 주된 pain point는 제한된 throughput이었습니다. 스타크웨어는 퍼포먼스를 향상시키기 위해 스타크넷 v0.10.2부터 병렬화를 도입하였고 다음 step으로는 (new shiny) `sequencer`를 소개합니다. 스타크웨어 측은 prover보다 sequencer를 퍼포먼스 bottleneck으로 봐서, sequencer 개발을 스타크넷의 throughput을 높이기 위한 앞으로의 첫 과제로 보고 있습니다. 이번에 발표된 sequencer는 Rust의 성능을 고려하며 개발되었고, 마찬가지로 Cairo VM의 Rust 구현체인 cairo-rs 또한 스타크넷에 통합되었습니다. 사실 완전한 sequencer가 아니라 sequencer에서 block을 실행하는 모듈인 `blockifier`가 발표되었는데요, blockifier를 필두로 다른 모듈들도 개발해나갈 것이라고 합니다.

## About Ethereum + a

_확장성과 데이터 가용성 등 현재 활발하게 논의되고 있는 주제들의 구성을 통해 이더리움과 같이 견고하고 안정된 생태계를 지향하는 스타크웨어의 성향을 엿볼 수 있었습니다._

> “Token & Transaction Fee Mechanism Design” — Prof. Noam Nisan

메커니즘 디자인이란 경제 이론(특히 게임 이론)의 내용으로 각기 다른 참여자가 각자의 위치에서 얻고자 하는 것을 위해 전략적으로 행동하도록 시스템을 설계하는 방법을 뜻합니다. 이 세션에서는 이러한 디자인을 컴퓨터 시스템에 적용하려는 사례로 블록체인을 꼽고, 특히 토큰과 트랜잭션 fee에 대해 다루었습니다. 블록체인에서는 leader (miner, validator, sequencer 등)가 블록을 생산합니다. leader는 블록 내의 공간(이하 block space)을 팔고, 유저는 자신의 트랜잭션을 포함시키기 위해 리더에게서 block space를 사려고 합니다.

여기서 leader가 블록에 트랜잭션을 포함시키게 하기 위한 인센티브로서 트랜잭션 fee의 필요성을 강조합니다. 그리고 트랜잭션 fee의 또 다른 필요성을 네트워크의 혼잡도를 조정(congestion control)하기 위함으로 꼽습니다. block space보다 유저들이 제출한 트랜잭션들의 크기의 합이 더 클 때 블록에 포함할 트랜잭션을 골라내기 위한 방법이 필요한데, 이를 위해 트랜잭션마다 각 유저에게 가치가 있다고 가정하고 블록체인이 만들어낼 수 있는 총가치를 최대화하려 합니다. 이때 각 트랜잭션의 value는 “*유저가 이 트랜잭션을 위해 얼마까지 기꺼이 내려 하는지”*가 됩니다. 이렇게 하나의 블록체인이 최대한의 유용성을 제공하기 위해 트랜잭션 fee가 높은 순으로 블록에 담기게 되고, 비트코인의 Pay-your-bid 모델이 이에 해당합니다.

Pay-your-bid 모델에서 사용자는 트랜잭션을 통해 얻을 수 있는 이득과 지불하려는 트랜잭션 fee 사이에서 고민하고, 본인의 트랜잭션이 포함되게 하기 위한 최소한의 fee를 지불하려 합니다. 그러나 이 minimum fee는 네트워크의 상황과 사용자들의 경쟁에 따라 항상 달라지며 예측하기 매우 어렵습니다. 그에 반해 이더리움의 EIP-1559는 네트워크 혼잡도에 따른 baseGasFee와 leader에게 추가로 지불할 tips로 fee 구성을 나누어 사용자가 네트워크 혼잡도를 쉽게 알 수 있도록 합니다.

메커니즘 디자인의 공통된 목적은 참여자들을 전략에서 자유롭게 하는 것에 있습니다. 즉, 참여자가 전체 시스템을 꾸준히 관찰하고 전략을 통해 경쟁하는 것보다 단순히 자신의 목적만을 위해 행동하게 하는 것이 더 나은 메커니즘 디자인입니다. 더 나아가 스스로 알고 있는 정보나 의향을 말하게 하는 메커니즘이 훨씬 좋다고 강조합니다. 이러한 시스템을 Incentive compatible 한, 즉 유인 부합한 시스템이라고 합니다. Incentive compatibility, 즉 유인 부합성은 정직하게 행동하는 것이 그렇지 않은 경우보다 항상 이득이 되게 하는 조건입니다. 즉, 사용자가 자신의 의향을 사실대로 말하게 하기 위한 조건이며 Incentive compatible 한 시스템에서 참여자는 원하는 것을 파악하기만 하면 되며 시스템을 조작하고 경쟁할 필요가 없습니다.

앞서 언급한 EIP-1559에서 사용자는 네트워크의 상황을 알기 위해 복잡한 관찰과 전략 세우기, 가장 좋은 fee 입찰가 찾기 경쟁을 할 필요가 없으며 트랜잭션을 포함시키고 싶은 만큼 추가로 tip을 설정하는 것만 가능합니다. leader 또한 baseGasFee를 조정할 수 없으며 블록 크기를 고려하여 트랜잭션을 accept하는 것 외에는 아무런 액션을 취할 수 없습니다. 누구도 시스템을 조작할 이유가 없고 자신의 목적대로 행동하게 됩니다.

본질적으로 fee 체계는 제한된 block size를 여러 사용자가 나누어 차지하므로 나타난 구조입니다. 대표적으로 비트코인의 bytes, 이더리움의 gas가 제한된 리소스이나, Layer 2가 등장하고 생태계가 다양해짐에 따라 점점 다양한 리소스가 네트워크의 bottleneck이 되고 있습니다. 이더리움의 storage, L2에서 L1으로 data를 내리기 위해 발생하는 비용 등이 해당합니다. 이에 세션에서는 여러 리소스를 나누어서 fee 체계를 구성하는 multi-dimensional pricing의 blueprint를 제시했습니다. 작년 [비탈릭 부테린도 제안](https://ethresear.ch/t/multidimensional-eip-1559/11651)한 바 있는 multi-dimensional EIP-1559에서는 여러 리소스의 종류에 따라 fee를 따로 나누어 수합합니다. 예를 들어 L2 compute fee, L1 data fee, Storage fee를 나누어 구성할 수 있으며 각각 L2 네트워크의 혼잡도나 L1 네트워크의 gas price, 이더리움의 storage size에 따라 변동될 수 있습니다. 사용자가 지불하게 되는 multi-dimensional fee는 아래와 같습니다.

![multi-dimensional fee](/images/posts/ss4.png)

이와 같은 fee 체계는 아직 디자인해야 할 부분이 많이 남아있으며, 여러 결정이나 의견들이 추가로 적용될 수 있습니다.

## About ZKP

_zero knowledge 기술의 현황과 이를 적용한 프로젝트들이 어디까지 개발되고 있는지 엿볼 수 있는 세션이었습니다. 기술적인 토픽은 역시 최적화를 위한 lookup protocol과 recursive STARK가 메인이었으며, 각기 다른 zkVM을 빌딩하는 팀들의 소개가 이루어졌습니다._

> “A Universal ZK Compute Layer ” — Brian Retford from Risc Zero

Risc Zero의 Bosai 프로젝트 소개 세션이었습니다. 자체 Cairo VM을 구축한 스타크웨어, 이더리움의 opcode를 검증하기 위한 polygon hermez zkEVM과 다르게 Risc Zero zkVM은 RISC-V instruction set를 검증하도록 하여 general-purpose zkVM을 구축하는 것을 목적으로 하고 있습니다. 따라서 일반적인 프로그래밍 언어인 Rust, C++로 작성된 코드를 검증할 수 있도록 지원합니다. 곧 Go가 지원될 예정이고, RISC-V로 컴파일되는 어떤 프로그래밍 언어도 추후 지원할 수 있다고 합니다.

![Risc-0 zkVM](/images/posts/ss5.png)

Bonsai는 이 Risc Zero의 zkVM으로 만든 첫 네트워크입니다. 이는 애플리케이션 개발자들이 자유롭게 개발할 수 있도록 합니다. 자동차 레이싱 게임과 같은 복잡한 비즈니스 로직을 가진 애플리케이션도 Bonsai 위에서 자유롭게 개발될 수 있습니다.

![Risc-0 Bonsai](/images/posts/ss6.png)

Bonsai가 작동하는 구조를 간단하게 살펴보면, 위 레이싱 게임을 예로 들었을 때 스타크넷의 state에 모든 플레이어의 위치나 차례 등을 반영하고, Bonsai는 이 state를 가져와서 (c++ 등의 코드로 작성된)복잡한 연산을 실행합니다. 이 연산을 하나의 롤업에서 처리한 후 스타크넷 등의 체인에서 zk proof를 검증하고 새로 상태를 업데이트하게 됩니다.

Risc Zero는 개발자들에게 다양한 선택지를 제공하고 싶다고 합니다. RISC-V를 선택해서 general purpose zkVM을 구축한 것도 그러한 이유 때문입니다. [Risc Zero의 레포지토리](https://github.com/risc0/risc0-rust-examples)에서 여러 Rust 예시를 확인할 수 있습니다.

> “Recursive STARKs in the zkEVM Context”

Polygon zkEVM이 확장성을 가질 수 있게 하는 핵심 요소인 recursive STARK에 대한 세션이었습니다.

![polygon zkEVM](/images/posts/ss7.png)
잘 알려져 있듯이 Polygon zkEVM의 prover는 각각 연산 실행에 대한 proof를 생성합니다. 그리고 이 proof들을 aggregate하여 하나의 최종 proof를 만들게 됩니다.

먼저 각 prover는 트랜잭션 batch를 실행하고 proof를 만들어야 합니다. 이 batch prover를 자세히 뜯어보면 아래와 같은 circuit 형태를 가지고 있습니다. 그리고 c12a circom circuit에서 이 zkEVM proof를 input으로 받아 새로운 proof를 생성하게 됩니다. 이는 proof를 aggregate하기 쉬운 형태로 변환하기 위함입니다.

![polygon batch prover and circom circuit](/images/posts/ss8.png)

이제부터 recursive 과정이 시작되는데요, recursive1 CIRCOM circuit을 통해 c12a proof를 input으로 한 recursive proof를 생성해 줍니다. 그리고 이 proof를 검증하는 로직이 담긴 verifier template에 recursive proof를 넣어 검증하는 연산의 유효성을 검증하는 새로운 proof를 만들어 줍니다.

![recursive circuit](/images/posts/ss9.png)

이제 두 개의 proof를 aggregate 하는 과정입니다. 두 개의 recursiveVerifier에 proof를 제외한 모든 input을 통일한 후 두 개의 recursive proof를 넣고 검증하는 과정을 새로운 proof로 만들어 줍니다.

![aggregation circuit](/images/posts/ss10.png)

이렇게 aggregate된 proof와 state값들을 마지막으로 final circuit에 넣고 온체인에 올라갈 하나의 singlePublic 값을 계산하게 됩니다.

![final verifier](/images/posts/ss11.png)

recursive STARK의 이론을 깊게 들어가면 이해하기 매우 어렵기 때문에 — ~~제가 들어갔던 세션 중 유일하게 질문이 하나도 나오지 않은 세션이었습니다~~ — 짧은 세션에서는 recursive STARK를 구현하기 위해 여러 recursiveVerifier 템플릿을 빌딩 블록처럼 쌓아나가며 input으로 받은 proof를 검증하는 연산을 다시 proof에 담아 최종적으로 final proof를 생성한다고만 알아가시면 좋을 것 같습니다.

> “ZKVM OGs” — Jordi Baylina from Polygon Hermez, Bobbin Threadbare from Polygon, Shahar Papini from StarkWare, Zac Williamson from Aztec, Alex Gluchowski from Matter Labs, Brian Retford form Risc Zero

각기 다른 zkVM을 빌딩하고 있는 여섯 패널들의 디스커션이 이루어졌습니다.

각 zkVM 프로젝트의 접근 방식이 다른 와중, ‘여러 zkVM이 프로덕션에 돌입하면 어떤 일이 일어날지?’와 같은 질문에는 대부분의 빌더들이 많은 프로젝트가 서로 협업해야 하고 이 시기를 상호 운용성을 확보할 수 있는 기회로 생각했으며 모든 프로젝트가 확장 가능하고 coexist할 수 있어야 한다고 답했습니다. 자신의 프로덕트의 강점만을 내세워 zkVM 경쟁에서 살아남을 것이라고 하기보단 서로 다른 technical design과 이에 따른 trade-off를 인정하고, 다양성과 공존을 강조하는 모습이 인상적이었습니다.

또한 스타크넷이 sequencer를 탈중앙화하겠다는 방향을 내세운 데 이어 ‘결국 다른 L2 프로토콜들도 비슷한 탈중앙화 sequencer 솔루션을 구현할 것이라고 믿는지?’에 대한 답으로는, Matter Labs 측은 단일 생태계에서도 다른 솔루션이 나올 것이라고 답했습니다. Validity가 유일한 가치이고 이것만을 보장할 수 있다면 centralized sequencer를 가져갈 것이고, 또 누군가는 성능보다 분산화를 우선시하게 될 것입니다. 또 Aztec 측은 sequencing은 복잡한 문제이며 Sequencing-as-a-service로서, sequencing 문제 중 일부를 위임받아 해결하려는 팀을 알고 있다고 답했습니다. 스타크넷이 로드맵을 functionality → performance → decentralization으로 발표했는데, 스타크넷 뿐만 아니라 많은 프로젝트들이 functionality를 만족하고 performance를 개선하는 과정에서 이제는 decentralization 또한 고려하기 시작했다고 느껴졌습니다. Sequencing 문제를 해결하는 다양한 솔루션을 기대해볼 수 있겠습니다.

> “Kakarot Project” — Elias Tazartes from Theodo, Clément Walter from Starksheet

이미 잘 알려져 있듯이, L1인 이더리움은 노드들이 트랜잭션을 재실행(re-execute)함으로써 유효성을 검증하고 zkEVM은 트랜잭션을 한 번 실행하면서 생성한 validity proof를 이후 검증하는 방식으로 유효성을 검증합니다. 이러한 zkEVM은 이더리움에 비해 뛰어난 확장성을 가지고 있기 때문에 여러 프로젝트들이 확장성 솔루션으로 zkEVM을 빌딩하고 있습니다.

Kakarot 또한 zkEVM으로, 별도의 블록체인이 아닌 EVM 바이트코드 interpreter이며 현재 Cairo로 작성된 컨트랙트로 스타크넷에 배포되어 있습니다. 사용자가 스타크넷으로 EVM 트랜잭션을 보내면, Cairo로 작성된 Kakarot 컨트랙트가 EVM bytecode를 실행합니다. 이 연산의 유효성은 Kakarot 컨트랙트가 스타크넷에 배포되어 있기 때문에 실행 결과인 trace로 만든 proof를 통해 검증 가능하고 최종적으로 L1 이더리움에 state가 반영되기 됩니다.

![kakarot](/images/posts/ss12.png)

Kakarot 팀은 프로젝트에 대해 자세히 설명하기보다는 (이름처럼) 유머러스한 밈들을 사용하며 프로젝트의 역사와 가능성, 커뮤니티에 대해 이야기했습니다. 프로젝트는 [깃허브 레포지토리](https://github.com/kkrt-labs/kakarot)에서 확인하실 수 있습니다.

## Workshops

> “Starknet in Rust” — Federico Carrone from Lambda Class

Lambda Class에서 구현한 Starknet in Rust 프로젝트의 overview와 이 프로젝트 레포지토리에 기여할 수 있도록 온보딩하는 핸즈온 워크샵이 진행되었습니다.

Lambda Class는 Cairo VM의 Rust 구현체인 [Cairo-rs](https://github.com/lambdaclass/cairo-vm)를 개발하며 퍼포먼스를 개선하고자 합니다. 기존 Cairo VM은 파이썬으로 개발되어 있는데, 이를 Rust로 구현하고 common library의 math function에 대해 벤치마크 테스트를 수행한 결과 아래와 같이 개선된 결과를 기록했다고 합니다.

![lambda](/images/posts/ss13.png)

Cpython에 비해 약 100배 빠르고 메모리 사용량은 1/2배, PyPy보다 약 20배 빠르고 메모리 사용량은 1/12배를 기록했습니다.

이를 python으로 wrapping하여 사용할 수 있게 하는 [cairo-rs-py](https://github.com/lambdaclass/cairo-vm-py)를 추가로 개발하고 있으며, cairo-rs-py에서는 cairo-rs의 python FFI (Foreign Function Interface, 한 언어가 다른 언어로 작성된 함수를 호출하여 실행할 수 있도록 하는 구조)를 제공합니다. 이를 위해서는 Rust와 Python 간에 메모리를 공유해야 하는데, 이 때 context switching이 개발시 가장 큰 bottleneck이었다고 합니다. 이미 스타크넷과의 integration은 마쳤으며 Kakarot, ZeroSync, Protostar, Pathfinder등의 프로젝트에서 테스트하며 사용하고 있습니다.

Cairo-rs VM을 기반으로 구축한 [Starknet in Rust](https://github.com/lambdaclass/starknet_in_rust)의 비즈니스 로직을 살펴보면 Declare, Deploy, Invoke등의 트랜잭션을 Input으로 받고 변화한 State와 Execution information이 Output이 됩니다. 이 때 Starknet in Rust는 State을 관리하기 위해 추상한 인터페이스를 제공합니다.
