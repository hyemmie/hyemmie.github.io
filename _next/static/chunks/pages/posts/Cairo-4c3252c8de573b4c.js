(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[19],{3908:function(r,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/Cairo",function(){return n(623)}])},623:function(r,e,n){"use strict";n.r(e),n.d(e,{__toc:function(){return s}});var a=n(5893),t=n(2673),i=n(8473),o=n(7204);n(6067);var c=n(2643);let s=[];function p(r){let e=Object.assign({p:"p",a:"a",h1:"h1",strong:"strong",em:"em"},(0,c.a)(),r.components);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.p,{children:"[StarkWare series] Cairo가 프로그램의 유효성을 증명하는\xa0방법\r\nTL;DR\r\n본 게시글에서는 스타크웨어 생태계에서 한 축을 담당하고 있는 프로그래밍 언어 Cairo에 대해 살펴본다. Cairo는 증명 가능한 프로그램을 작성하기 위해 개발된 언어이며, 이를 구현하기 위해 CPU 아키텍처가 제안되었다. 이 Cairo 아키텍처를 통해 어떻게 프로그램의 유효성을 검증하는지 그 과정을 살펴보도록 한다. 본 게시글은 Cairo Whitepaper\xa0: \"Cairo - a Turing-complete STARK-friendly CPU architecture\" 기반으로 작성되었으며, 구독자가. 컴퓨터 아키텍처에 대한 기본적인 지식(폰 노이만 구조, 레지스터, 메모리, instruction 등)을 갖추고 있다고 가정하였다.\r\n용어 정리\r\nProver\xa0: '이 계산이 무결하다'는 것을 증명하고 싶은 참여자\r\nVerifier\xa0: 계산의 무결성을 검증하고 싶은 참여자\r\nProof\xa0: 유효한 계산의 증명\r\nInstruction\xa0: CPU가 작성된 프로그램을 수행하기 위해 실제로 동작하는 단위의 명령어\r\nCairo 프로그램\xa0: Cairo 언어로 작성된 임의의 프로그램"}),"\n",(0,a.jsxs)(e.p,{children:["Cairo란?\r\n스타크웨어가 증명을 효율적으로 생성하고 검증하기 위해, 그리고 공통된 연산 과정을 사용하여 다양한 비즈니스 로직에 대한 증명을 생성하기 위해 Cairo라는 프로그래밍 언어 및 실행 환경 프로그램을 개발했다.\r\n다른 프로그래밍 언어와 달리 Cairo는 증명 가능한 프로그램을 작성하기 위해 개발되었고, 이를 위해 스타크웨어 팀은 Turing-complete STARK-friendly CPU architecture를 제안하였다.\r\nWe present Cairo, and efficient and practical von Neumann architecture that can be used with the STARK proof system to generate proofs of computational integrity (Cairo Whitepaper 1.2 Our contribution)\r\nCairo 프로그램의 검증 과정을 요약하자면 증명하고자 하는 프로그램을 Cairo로 작성한 후, 작성된 프로그램을 실행하면 execution trace를 얻을 수 있으며 prover는 이 trace를 통해 STARK proof를 만들 수 있다. 그리고 이 proof를 verifier가 검증하게 되는 구조이다.\r\n출처: ",(0,a.jsx)(e.a,{href:"https://www.cairo-lang.org/cairo-for-blockchain-developers/%EB%B3%B8",children:"https://www.cairo-lang.org/cairo-for-blockchain-developers/본"})," 아티클에서는 trace가 어떻게 생성되는지, 이를 통해 어떻게 proof를 만들게 되는지 알아볼 것이다.\r\nCairo의 특징\r\n앞서 언급했던 Cairo의 디자인 목적은 다음과 같다.\r\n증명 가능한 statements로 쓰이는 프로그램을 쉽게 작성하고 읽기 위함\r\nSTARK proof system 기반으로 효율적인 증명을 생성하기 위함"]}),"\n",(0,a.jsx)(e.p,{children:'이 목적을 위한 Cairo 구현에서 핵심적인 특징은 바로 메모리 구조이다. Cairo 아키텍처에서는 "Nondeterministic Continuous Read-Only Random-Access Memory" 메모리 모델을 사용한다. 전통적인 Random-access read-write memory 모델에서는 instruction이 임의의 메모리 주소를 선택하고, 메모리 값을 읽거나 새로운 값을 쓰게 할 수 있다. 그러나 Nondeterministic Continuous Read-Only Random-Access Memory 모델에서는 메모리 값이 변하지 않고, 이미 값이 있는 주소의 경우 Cairo 프로그램은 메모리 값을 읽는 (read) 작업만 가능하다. 이를 통해 얻을 수 있는 이점은 다음과 같다.\r\nAIR 과정에서 필요한 값들을 메모리에 접근해서 가져오는 작업이 간단해진다.\r\nProver가 verifier에게 "이 메모리 주소는 이 값을 가진다."라고 증명하는 작업이 간단해진다.'}),"\n",(0,a.jsx)(e.p,{children:'Trace, State란 무엇인가? Cairo 프로그램이 실행되는\xa0단계\r\n앞서 전체적인 개념을 설명하면서 Cairo 언어로 작성된 프로그램을 실행하면 trace를 얻을 수 있다고 했는데, 도대체 이 trace가 무엇이길래 Cairo로 작성된 프로그램의 증명을 가능하게 하는 것일까?\r\n결론부터 말하자면 trace는 프로그램을 실행하면서 사용한 메모리 주소의 나열이다. Cairo의 메모리 디자인 덕분에 메모리 값을 덮어쓸 수 없고, 이는 프로그램을 실행하면서 사용한 값이 유실되지 않음을 뜻한다.\r\nCairo 언어로 작성된 프로그램이 실행되는 과정은 아래와 같이 간단히 정리할 수 있으며, 자세한 내용은 [1]의 Chapter 3.5, 3.6에서 확인할 수 있다.\r\nCairo 프로그램의 증명\xa0과정\r\n만약 "피보나치 수열의 j번째 수는 y다" 라는 문장을 증명하고 싶다면, 아래와 같은 과정을 거쳐야 한다.\r\n계산을 위한 Cairo 프로그램을 작성한다.\r\n작성된 프로그램을 Cairo 바이트코드로 변환한다.\r\nCairo Runner가 바이트코드를 실행하여 execution trace S, partial memory function m*, full memory function m을 얻는다.\r\nSTARK prover로 아래 statement에 대한 proof를 생성한다.'}),"\n",(0,a.jsx)(e.p,{children:'"nondeterministic Cairo machine은 input이 ( T, m*, pc_I, pc_F, ap_I, ap_F )일 때 accept 한다."\r\n위 statement에서 각 input이 의미하는 바는 다음과 같다.\r\nT\xa0: 실행한 프로그램의 연산 step 개수\r\nm*\xa0: 부분 메모리 함수\r\npc_I\xa0: 초기 pc 레지스터의 값\r\npc_F\xa0: 최종 pc 레지스터의 값\r\nap_I\xa0: 초기 ap레지스터의 값\r\nap_F\xa0: 최종 ap레지스터의 값'}),"\n",(0,a.jsx)(e.p,{children:"앞서 Cairo 아키텍처는 Nondeterministic Continuous Read-Only Random-Access Memory 디자인을 사용한다고 했는데, 이러한 메모리 디자인 덕분에 하나의 instruction(쉽게 생각해서 코드 한 줄)이 실행될 때마다 이미 사용된 메모리의 값 확인(read)만 가능하도록 유지되며, write는 사용되지 않은 메모리에만 허용되므로 프로그램이 실행되면서 사용한 모든 메모리 값을 확인할 수 있다.\r\n따라서 프로그램의 실행 단계에서의 pc, ap, fp라는 특정 레지스터 값을 나열할 수 있고 이를 execution trace 라고 한다.\r\n보충 설명\xa0: Cairo의 pc, ap, fp 레지스터\r\npc (program counter)\xa0: 현재 실행되는 instruction의 메모리 주소를 가리킨다.\r\nap (allocation pointer)\xa0: [convention] 아직 사용되지 않은 메모리 주소 중 첫 주소를 가리키며, 프로그래머가 다른 방향으로 쓸 수도 있다.\r\nfp (frame pointer)\xa0: 현재 function의 스택 메모리 시작점을 가리키는 레지스터(cf. RISC-V의 sp)로, 함수가 시작되면 ap와 같은 주소를 가리키다가 함수가 리턴되면 다시 이전에 가리키던 주소를 가리킨다."}),"\n",(0,a.jsx)(e.p,{children:"Cairo의 레지스터와 trace를 이해했다면, 다시 Cairo 프로그램의 증명 과정을 구체적으로 살펴보자.\r\nCairo 프로그램의 증명 과정\xa0: 1. Cairo Program\xa0작성\r\n하나의 Cairo program이 실행되는 과정을 이해하기 위해, 피보나치 프로그램을 예시로 살펴보자. 앞서 언급한 4단계의 과정 중 1단계에 해당한다.\r\n계산을 위한 Cairo 프로그램을 작성한다.\r\n작성된 프로그램을 Cairo 바이트코드로 변환한다.\r\nCairo Runner가 바이트코드를 실행하여 execution trace S, partial memory function m*, full memory function m을 얻는다.\r\nSTARK prover로 아래 statement에 대한 proof를 생성한다."}),"\n",(0,a.jsx)(e.p,{children:'"nondeterministic Cairo machine은 input이 ( T, m*, pc_I, pc_F, ap_I, ap_F )일 때 accept 한다."\r\nj번째 피보나치 수를 구하는 프로그램의 Cairo assembly 코드는 다음과 같으며, 주석으로 각 라인의 설명과 해당 라인에서의 pc, ap, memory function을 나타내었다.'}),"\n",(0,a.jsx)(e.h1,{children:"피보나치 수열을 (1, 1, ...)로 초기화한다."}),"\n",(0,a.jsx)(e.p,{children:"[ap] = 1; ap++"}),"\n",(0,a.jsx)(e.h1,{children:"pc*{i+1} = pc_i + 2, ap*{i+1} = ap_i + 1, m(ap_i) = 1"}),"\n",(0,a.jsx)(e.p,{children:"[ap] = 1; ap++"}),"\n",(0,a.jsx)(e.h1,{children:"pc*{i+1} = pc_i + 2, ap*{i+1} = ap_i + 1, m(ap_i) = 1"}),"\n",(0,a.jsx)(e.p,{children:"body:"}),"\n",(0,a.jsx)(e.h1,{children:"j번째 피보나치 수를 구하기 위한 iteration counter를 하나 감소시킨다."}),"\n",(0,a.jsx)(e.p,{children:"[ap] = [ap - 3] - 1; ap++"}),"\n",(0,a.jsx)(e.h1,{children:"pc*{i+1} = pc_i + 2, ap*{i+1} = ap_i + 1, m(ap_i) = m(ap_i - 3) - 1"}),"\n",(0,a.jsx)(e.h1,{children:"이전 단계에서 마지막 피보나치 값을 복사한다."}),"\n",(0,a.jsx)(e.p,{children:"[ap] = [ap - 2]; ap++"}),"\n",(0,a.jsx)(e.h1,{children:"pc*{i+1} = pc_i + 1, ap*{i+1} = ap_i + 1, m(ap_i) = m(ap_i - 2)"}),"\n",(0,a.jsx)(e.h1,{children:"피보나치 수열의 다음 값을 계산한다."}),"\n",(0,a.jsx)(e.p,{children:"[ap] = [ap - 3] + [ap - 4]; ap++"}),"\n",(0,a.jsx)(e.h1,{children:"pc*{i+1} = pc_i + 1, ap*{i+1} = ap_i + 1, m(ap_i) = m(ap_i - 3) + m(ap_i - 4)"}),"\n",(0,a.jsx)(e.h1,{children:"iteration counter가 0이 아니라면,"}),"\n",(0,a.jsx)(e.p,{children:"즉 j번째 피보나치 수 계산이 끝나지 않았다면 body로 점프한다.\r\njmp body if [ap - 3] != 0"}),"\n",(0,a.jsx)(e.h1,{children:"pc*{i+1} = m(ap_i - 3)이 0이면 pc_i + 2이고 아니면 pc_i + 4, ap*{i+1} = ap_i + 1"}),"\n",(0,a.jsxs)(e.p,{children:[(0,a.jsx)(e.strong,{children:"end"})," :\r\njmp ",(0,a.jsx)(e.strong,{children:"end"})," # 무한루프"]}),"\n",(0,a.jsx)(e.h1,{children:"pc*{i+1} = pc_i, ap*{i+1} = ap_i"}),"\n",(0,a.jsx)(e.p,{children:"위 Cairo assembly 코드가 동작하는 과정을 아래와 같이 도식화할 수 있다. (편의상 pc를 제외하고 memory function과 직접적으로 관련있는 ap만 도식화하였다.)\r\n예시 코드에서의 j는 m(ap_I -1) = j, 즉 j번째 피보나치 수에서 j에 해당한다.\r\nbody 반복문에 진입하기 전, 처음 두 라인이 실행되면 (m(ap -3), m(ap -2), m(ap -1)) = (j, 1, 1)의 값을 가지며 body에 진입한 후 세 라인이 실행되면 (j-1, 1, 2)가 된다.\r\n이후 (j-2, 2, 3)\xa0, (j-3, 3, 5), (j-4, 5, 8), (j-5, 8, 13)\xa0… 순으로 (m(ap -3), m(ap -2), m(ap -1)) 값이 변화하는데, 이를 보면 각 단계에서의 값이 곧 (계산까지 남은 단계, 피보나치 계산을 위한 첫 번째 수, 피보나치 계산을 위한 두 번째 수) 임을 알 수 있다.\r\n아래 그림은 피보나치 수열이 (1, 1, 2, 3) 까지 계산된 상태에서 2 + 3 = 5를 계산하는 과정(j = 7, (j-2, 2, 3) ⇒ (j-3, 3, 5))에 해당한다.\r\nCairo 프로그램의 증명 과정\xa0: 2. Cairo\xa0Bytecode\r\nCairo assembler가 프로그램을 Cairo 바이트코드로 변환하며, 이 단계는 앞서 언급한 4단계 중 2단계에 해당한다.\r\n계산을 위한 Cairo 프로그램을 작성한다.\r\n작성된 프로그램을 Cairo 바이트코드로 변환한다.\r\nCairo Runner가 바이트코드를 실행하여 execution trace S, partial memory function m*, full memory function m을 얻는다.\r\nSTARK prover로 아래 statement에 대한 proof를 생성한다."}),"\n",(0,a.jsxs)(e.p,{children:['"nondeterministic Cairo machine은 input이 ( T, m*, pc',(0,a.jsx)(e.em,{children:'I, pc_F, ap_I, ap_F )일 때 accept 한다."\r\nCairo 바이트코드는 아래 요소들로 구성되어 있다.\r\nfield element b의 sequence, 즉 b = (b0,\xa0…\xa0, b'}),"{|b|-1})\r\n두 개의 index인 prog_start, prog_end"]}),"\n",(0,a.jsxs)(e.p,{children:["Cairo 바이트코드에는 프로그램을 실행하기 위해 필요한 정보가 들어있으며, 프로그램을 실행하고 싶다면 메모리 주소의 기본값인 pr(program base)를 고른 후 이에 맞게 partial memory function m",(0,a.jsx)(e.em,{children:"과 pc_I, pc_F를 설정한다. 이는 프로그램을 실행할 때 필요한 메모리의 범위만 있다면 임의의 주소를 선택해 해당 주소부터 시작하여 사용할 수 있게 하기 위함이다.\r\npartial memory function m"})," 은 m*(prog",(0,a.jsx)(e.em,{children:"base + i) = b_i, (i 는 [0, |b|])로 설정되며, pc_I와 pc_F는 각각 pc_I = prog_base + prog_start, pc_F = prog_base + prog_end로 설정된다. 즉 |b|개의 element인 b = ( b0\xa0,\xa0…\xa0, b"}),"{|b| -1})는 prog_base부터 prog_base + |b| 에 해당하는 주소의 메모리 값이다.\r\n위 피보나치 프로그램에서 아래와 같은 바이트코드를 얻을 수 있다.\r\n출처\xa0: Cairo whitepaperprog_base를 0이라 가정하면,\r\n이 바이트코드에 의해 partial memory function은 m*(0) = 0x480680017fff8000, m*(1) = 1, m*(2) = 0x480680017fff8000,\xa0… 와 같이 설정된다. pc값은 pc",(0,a.jsx)(e.em,{children:"I = 0 + 0, pc_F = 0 + 10로 설정된다.\r\n실제로 위 피보나치 코드를 컴파일했을 때 아래와 같은 바이트코드를 얻었다. data 가 b = ( b0\xa0,\xa0...\xa0, b"}),"{|b| - 1})에 해당한다.\r\n컴파일된 fib-compiled.json 파일Cairo 프로그램의 증명 과정\xa0: 3. Cairo Runner\xa0실행\r\nCairo Runner는 컴파일된 Cairo 프로그램(위와 같은 바이트코드)을 실행하는 프로그램이다. Cairo Runner를 통해 프로그램을 실행하는 것이 세 번째 단계에 해당하며, 실행한 후 proof 생성에 필요한 값들을 얻을 수 있다.\r\n계산을 위한 Cairo 프로그램을 작성한다.\r\n작성된 프로그램을 Cairo 바이트코드로 변환한다.\r\nCairo Runner가 바이트코드를 실행하여 execution trace S, partial memory function m*, full memory function m을 얻는다.\r\nSTARK prover로 아래 statement에 대한 proof를 생성한다."]}),"\n",(0,a.jsxs)(e.p,{children:['"nondeterministic Cairo machine은 input이 ( T, m*, pc_I, pc_F, ap_I, ap_F )일 때 accept 한다."\r\nCairo Runner는 컴파일된 바이트코드를 실행하며 execution trace, partial memory function과 full memory function을 얻는다. 여기서 execution trace는 위에서 언급했듯이 pc, ap, fp 레지스터 값이며, partial memory function, full memory function은 프로그램이 실행되면서 사용된 메모리 값들에 해당한다.\r\nCairo Runner의 소스 코드는 현재 스타크웨어 깃헙에 공개되어 있으며 (',(0,a.jsx)(e.a,{href:"https://github.com/starkware-libs/cairo-lang",children:"https://github.com/starkware-libs/cairo-lang"}),"), 아래 코드는 Cairo Runner 소스 코드 중 컴파일된 json 파일에서 trace(pc, ap, fp)를 기록하는 부분에 해당한다.\r\nclass CairoRunner:\r\ndef ",(0,a.jsx)(e.strong,{children:"init"}),'(\r\nself,\r\nprogram: ProgramBase,\r\nlayout: str = "plain",\r\nmemory: MemoryDict = None,\r\nproof_mode: Optional[bool] = None,\r\nallow_missing_builtins: Optional[bool] = None,\r\n):\r\nself.program = program\r\nself.layout = layout\r\nself.builtin_runners: Dict[str, BuiltinRunner] = {}\r\nself.original_steps = None\r\nself.proof_mode = False if proof_mode is None else proof_mode\r\nself.allow_missing_builtins = (\r\nFalse if allow_missing_builtins is None else allow_missing_builtins\r\n)\r\n...\r\ndef relocate(self):\r\nself.segment_offsets = self.segments.relocate_segments()\r\nself.relocated_memory = MemoryDict(\r\n{\r\nself.relocate_value(addr): self.relocate_value(value)\r\nfor addr, value in self.vm_memory.items()\r\n}\r\n)\r\nself.relocated_trace = relocate_trace(\r\nself.vm.trace, self.segment_offsets, self.program.prime\r\n)\r\nfor builtin_runner in self.builtin_runners.values():\r\nbuiltin_runner.relocate(self.relocate_value)\r\nCairo Runner 클래스의 메서드인 relocate 는 relocate_trace 메서드를 통해 하나의 instruction을 실행하면서 self.relocated_trace를 업데이트한다.\r\nrelocate_trace 메서드는 현재까지의 trace와 instruction 정보를 받아 새로운 pc, ap, fp 값을 trace에 추가하여 반환한다.\r\ndef relocate_trace(\r\ntrace: List[TraceEntry[MaybeRelocatable]],\r\nsegment_offsets: Dict[int, T],\r\nprime: int,\r\nallow_missing_segments: bool = False,\r\n) -> List[TraceEntry[T]]:\r\nnew_trace: List[TraceEntry[T]] = []\r\ndef relocate_val(x):\r\nreturn relocate_value(x, segment_offsets, prime, allow_missing_segments)\r\nfor entry in trace:\r\nnew_trace.append(\r\nTraceEntry(\r\npc=relocate_val(entry.pc),\r\nap=relocate_val(entry.ap),\r\nfp=relocate_val(entry.fp),\r\n)\r\n)\r\nreturn new_trace\r\nCairo 프로그램의 증명 과정\xa0: 4. STARK proof\xa0생성\r\nCairo Runner가 프로그램을 실행하여 execution trace를 포함한 output을 반환했다면, 이제 proof의 재료가 될 statement를 작성할 수 있다. STARK prover (StarkEx 서비스들은 SHARP - shared prover를 사용한다.)가 statement에 대한 proof를 만들게 되며, 이 과정이 Cairo를 통한 proof 생성의 마지막 단계에 해당한다.\r\n계산을 위한 Cairo 프로그램을 작성한다.\r\n작성된 프로그램을 Cairo 바이트코드로 변환한다.\r\nCairo Runner가 바이트코드를 실행하여 execution trace S, partial memory function m*, full memory function m을 얻는다.\r\nSTARK prover로 아래 statement에 대한 proof를 생성한다.']}),"\n",(0,a.jsx)(e.p,{children:'"nondeterministic Cairo machine은 input이 ( T, m*, pc_I, pc_F, ap_I, ap_F )일 때 accept 한다."\r\n먼저 스타크웨어가 제시한 deterministic Cairo machine과 nondeterministic Cairo machine의 개념을 살펴보자.\r\n(수식을 담기 위해 개념 내용은 별도로 정리한 notion 페이지의 내용을 사용)\r\nproof로 만들고자 하는 statement를 다시 살펴보자.\r\n"nondeterministic Cairo machine은 input이 ( T, m*, pc_I, pc_F, ap_I, ap_F )일 때 accept 한다."\r\n이 statement가 성립한다면, 즉 nondeterministic Cairo machine이 ( T, m*, pc_I, pc_F, ap_I, ap_F )을 accept 한다면 deterministic Cairo machine이 accept 하는 input인 ( T, m, S )가 존재함을 나타낸다.\r\n증명은 다음과 같다.\r\nm은 m*을 확장하기 때문에, m*이 포함하는 Cairo 프로그램(편의상 피보나치 프로그램)의 바이트코드는 m에 포함된다. 따라서 프로그램의 모든 step에 대해 memory function을 확인할 수 있다.\r\npc_I = prog_base + prog_start이기 때문에 deterministic Cairo machine이 실행하는 첫 instruction은 피보나치 프로그램의 첫 instruction이다.\r\nT개의 step동안 동일하게 실행된다.\r\npc_F = prog_base + prog_end이기 때문에, 피보나치 프로그램의 마지막 instruction 실행을 확인할 수 있다.'}),"\n",(0,a.jsxs)(e.p,{children:["결론적으로 deterministic Cairo machine의 output이 accept 라면, 각 step마다 state (pc, ap, fp) transition이 모두 valid함을 나타내며 이는 Cairo로 작성된 프로그램 연산의 유효성을 보장한다.\r\n이 연산의 유효성을 증명해줄 proof가 만들어지면 이는 온체인의 SHARP 컨트랙트로 전달된다. 현재 SHARP 컨트랙트는 이더리움 goerli 테스트넷(",(0,a.jsx)(e.a,{href:"https://goerli.etherscan.io/address/0xAB43bA48c9edF4C2C4bB01237348D1D7B28ef168#readContract",children:"https://goerli.etherscan.io/address/0xAB43bA48c9edF4C2C4bB01237348D1D7B28ef168#readContract"}),") 에 배포되어 있다.\r\nSHARP 컨트랙트는 Fact Registry라는 컨트랙트에 fact라는 이름으로 증명(proof)을 작성하여 저장한다. 증명이 만들어졌으니 이를 검증해야 하고, 이 역할은 추후 설명할 Verifier Contract가 담당하게 된다.\r\n이 fact가 온체인에 등록되었으므로 Verifier Contract는 유효성 검증을 위해 이를 사용할 수 있다. Verify Contract의 검증 로직은 이후 시리즈에서 다루기로 한다.\r\n맺음말\r\n스타크웨어는 범용적인 증명의 생성과 검증을 위해 Cairo 언어를 개발하였다. 이 언어가 어떻게 프로그램의 유효성을 증명하는지 살펴보았고, 결국 핵심은 메모리의 불변성을 기반으로 (pc, ap, fp)의 state transition을 통해 프로그램의 유효성을 증명하는 것이었다. 프로그램을 실행하는 것만으로도 유효성을 증명할 수 있다는 것, 또한 그 증명 과정에서 필요한 연산을 최소화했다는 것은 분명 L2 네트워크에서 지속가능한 확장성을 구현하는 데에 일조한다. 그러나 아직 StarkEx에 참여하는 프로젝트들 (dydx, Immutable X, Sorare, DeverseFi)의 Cairo로 작성된 비즈니스 로직이 아직까지 오픈소스로서 공개된 사항은 없으며, 이상적인 스타크웨어 생태계를 위해서는 Cairo의 적용이 더욱 확대되어야 한다. 이를 위해 본 게시글은 Cairo에 대한 아주 기본적인 이해를 돕고 있다.\r\n내용 피드백과 추가적인 질문은 아래 연락처로 부탁드립니다.\r\nemail\xa0: ",(0,a.jsx)(e.a,{href:"mailto:lhm0710@snu.ac.kr",children:"lhm0710@snu.ac.kr"}),'\r\nReference\r\n[1] Lior Goldberg, Shahar Papini, and Michael Riabzev, "Cairo - a Turing-complete STARK-friendly CPU architecture", 2021']})]})}let l={MDXContent:function(){let r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:e}=Object.assign({},(0,c.a)(),r.components);return e?(0,a.jsx)(e,{...r,children:(0,a.jsx)(p,{...r})}):p(r)},pageOpts:{filePath:"pages/posts/Cairo.md",route:"/posts/Cairo",frontMatter:{title:"StarkWare의 Cairo 언어가 프로그램의 유효성을 증명하는 방법",date:"2023/12/11",description:"This is description",tag:"Layer 2, ZKP",author:"You"},timestamp:1702378614e3,pageMap:[{kind:"MdxPage",name:"index",route:"/",frontMatter:{type:"page",title:"About",date:"2023-12-08T00:00:00.000Z"}},{kind:"Folder",name:"photos",route:"/photos",children:[{kind:"MdxPage",name:"hok",route:"/photos/hok",frontMatter:{title:"Hokkaido",date:"2021/3/19",description:"These are my Photos.",tag:"Hokkaido",author:"You"}},{kind:"MdxPage",name:"index",route:"/photos",frontMatter:{type:"page",title:"Photos",date:"2021-03-18T00:00:00.000Z"}},{kind:"Meta",data:{hok:"Hokkaido",index:"Photos"}}]},{kind:"Folder",name:"posts",route:"/posts",children:[{kind:"MdxPage",name:"Cairo",route:"/posts/Cairo",frontMatter:{title:"StarkWare의 Cairo 언어가 프로그램의 유효성을 증명하는 방법",date:"2023/12/11",description:"This is description",tag:"Layer 2, ZKP",author:"You"}},{kind:"MdxPage",name:"index",route:"/posts",frontMatter:{type:"posts",title:"Posts",date:"2021-03-18T00:00:00.000Z"}},{kind:"MdxPage",name:"markdown",route:"/posts/markdown",frontMatter:{title:"Markdown Examples",date:"2021/3/19",description:"View examples of all possible Markdown options.",tag:"web development",author:"You"}},{kind:"MdxPage",name:"pages",route:"/posts/pages",frontMatter:{title:"Next.js Pages",date:"2021/3/18",description:"Learn more about Next.js pages.",tag:"web development",author:"You"}},{kind:"Meta",data:{Cairo:"StarkWare의 Cairo 언어가 프로그램의 유효성을 증명하는 방법",markdown:"Markdown Examples",index:"Posts",pages:"Next.js Pages"}}]},{kind:"MdxPage",name:"projects",route:"/projects",frontMatter:{type:"page",title:"Projects",date:"2023-12-08T00:00:00.000Z"}},{kind:"Meta",data:{index:"About",projects:"Projects"}}],flexsearch:{codeblocks:!0},title:"StarkWare의 Cairo 언어가 프로그램의 유효성을 증명하는 방법",headings:s},pageNextRoute:"/posts/Cairo",nextraLayout:i.ZP,themeConfig:o.Z};e.default=(0,t.j)(l)},7204:function(r,e,n){"use strict";var a=n(5893),t=n(2235),i=n.n(t);let o=new Date().getFullYear();e.Z={footer:(0,a.jsxs)("footer",{className:"jsx-2447ca1c11803f07",children:[(0,a.jsxs)("small",{className:"jsx-2447ca1c11803f07",children:[(0,a.jsx)("time",{className:"jsx-2447ca1c11803f07",children:o})," \xa9 Hyemin Lee.",(0,a.jsx)("a",{href:"/feed.xml",className:"jsx-2447ca1c11803f07",children:"RSS"})]}),(0,a.jsx)(i(),{id:"2447ca1c11803f07",children:"footer.jsx-2447ca1c11803f07{margin-top:8rem}a.jsx-2447ca1c11803f07{float:right}"})]})}}},function(r){r.O(0,[843,774,888,179],function(){return r(r.s=3908)}),_N_E=r.O()}]);