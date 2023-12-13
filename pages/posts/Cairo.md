---
title: StarkWare의 Cairo 언어가 프로그램의 유효성을 증명하는 방법
date: 2022/02/28
description: 스타크웨어 생태계에서 한 축을 담당하고 있는 프로그래밍 언어 Cairo에 대해 살펴본다.
tag: Layer 2, ZKP, Blockchain, StarkWare
author: You
---

## TL;DR

본 게시글에서는 스타크웨어 생태계에서 한 축을 담당하고 있는 프로그래밍 언어 Cairo에 대해 살펴본다. Cairo는 증명 가능한 프로그램을 작성하기 위해 개발된 언어이며, 이를 구현하기 위해 CPU 아키텍처가 제안되었다. 이 Cairo 아키텍처를 통해 어떻게 프로그램의 유효성을 검증하는지 그 과정을 살펴보도록 한다. 본 게시글은 Cairo Whitepaper : "Cairo - a Turing-complete STARK-friendly CPU architecture" 기반으로 작성되었으며, 구독자가. 컴퓨터 아키텍처에 대한 기본적인 지식(폰 노이만 구조, 레지스터, 메모리, instruction 등)을 갖추고 있다고 가정하였다.

## 용어 정리

- Prover : '이 계산이 무결하다'는 것을 증명하고 싶은 참여자
- Verifier : 계산의 무결성을 검증하고 싶은 참여자
- Proof : 유효한 계산의 증명
- Instruction : CPU가 작성된 프로그램을 수행하기 위해 실제로 동작하는 단위의 명령어
- Cairo 프로그램 : Cairo 언어로 작성된 임의의 프로그램

## Cairo란?

스타크웨어가 증명을 효율적으로 생성하고 검증하기 위해, 그리고 공통된 연산 과정을 사용하여 다양한 비즈니스 로직에 대한 증명을 생성하기 위해 Cairo라는 프로그래밍 언어 및 실행 환경 프로그램을 개발했다.

다른 프로그래밍 언어와 달리 Cairo는 증명 가능한 프로그램을 작성하기 위해 개발되었고, 이를 위해 스타크웨어 팀은 Turing-complete STARK-friendly CPU architecture를 제안하였다.

> We present Cairo, and efficient and practical von Neumann architecture that can be used with the STARK proof system to generate proofs of computational integrity (Cairo Whitepaper 1.2 Our contribution)

Cairo 프로그램의 검증 과정을 요약하자면 증명하고자 하는 프로그램을 Cairo로 작성한 후, 작성된 프로그램을 실행하면 execution trace를 얻을 수 있으며 prover는 이 trace를 통해 STARK proof를 만들 수 있다. 그리고 이 proof를 verifier가 검증하게 되는 구조이다.

![Cairo Architecture](/images/posts/cairo1.png)

본 글에서는 trace가 어떻게 생성되는지, 이를 통해 어떻게 proof를 만들게 되는지 알아볼 것이다.

## Cairo의 특징

앞서 언급했던 Cairo의 디자인 목적은 다음과 같다.

- 증명 가능한 statements로 쓰이는 프로그램을 쉽게 작성하고 읽기 위함
- STARK proof system 기반으로 효율적인 증명을 생성하기 위함

이 목적을 위한 Cairo 구현에서 핵심적인 특징은 바로 메모리 구조이다. Cairo 아키텍처에서는 **"Nondeterministic Continuous Read-Only Random-Access Memory"** 메모리 모델을 사용한다. 전통적인 Random-access read-write memory 모델에서는 instruction이 임의의 메모리 주소를 선택하고, 메모리 값을 읽거나 새로운 값을 쓰게 할 수 있다. 그러나 Nondeterministic Continuous Read-Only Random-Access Memory 모델에서는 메모리 값이 변하지 않고, 이미 값이 있는 주소의 경우 Cairo 프로그램은 **메모리 값을 읽는 (read) 작업만 가능**하다. 이를 통해 얻을 수 있는 이점은 다음과 같다.

- AIR 과정에서 필요한 값들을 메모리에 접근해서 가져오는 작업이 간단해진다.
- Prover가 verifier에게 "이 메모리 주소는 이 값을 가진다."라고 증명하는 작업이 간단해진다.

## Trace, State란 무엇인가? Cairo 프로그램이 실행되는 단계

앞서 전체적인 개념을 설명하면서 Cairo 언어로 작성된 프로그램을 실행하면 trace를 얻을 수 있다고 했는데, 도대체 이 trace가 무엇이길래 Cairo로 작성된 프로그램의 증명을 가능하게 하는 것일까?

결론부터 말하자면 trace는 프로그램을 실행하면서 사용한 메모리 주소의 나열이다. Cairo의 메모리 디자인 덕분에 메모리 값을 덮어쓸 수 없고, 이는 프로그램을 실행하면서 사용한 값이 유실되지 않음을 뜻한다.

Cairo 언어로 작성된 프로그램이 실행되는 과정은 아래와 같이 간단히 정리할 수 있으며, 자세한 내용은 [1]의 Chapter 3.5, 3.6에서 확인할 수 있다.

## Cairo 프로그램의 증명 과정

만약 _"피보나치 수열의 j번째 수는 y다"_ 라는 문장을 증명하고 싶다면, 아래와 같은 과정을 거쳐야 한다.

1. 계산을 위한 Cairo 프로그램을 작성한다.
2. 작성된 프로그램을 Cairo 바이트코드로 변환한다.
3. Cairo Runner가 바이트코드를 실행하여 execution trace S, partial memory function m\*, full memory function m을 얻는다.
4. STARK prover로 아래 statement에 대한 proof를 생성한다.

"nondeterministic Cairo machine은 input이 ( T, m\*, pc_I, pc_F, ap_I, ap_F )일 때 `accept` 한다."
위 statement에서 각 input이 의미하는 바는 다음과 같다.

- T : 실행한 프로그램의 연산 step 개수
- m\* : 부분 메모리 함수
- pc_I : 초기 pc 레지스터의 값
- pc_F : 최종 pc 레지스터의 값
- ap_I : 초기 ap레지스터의 값
- ap_F : 최종 ap레지스터의 값

앞서 Cairo 아키텍처는 Nondeterministic Continuous Read-Only Random-Access Memory 디자인을 사용한다고 했는데, 이러한 메모리 디자인 덕분에 하나의 instruction(쉽게 생각해서 코드 한 줄)이 실행될 때마다 이미 사용된 메모리의 값 확인(read)만 가능하도록 유지되며, write는 사용되지 않은 메모리에만 허용되므로 프로그램이 실행되면서 사용한 모든 메모리 값을 확인할 수 있다.

따라서 프로그램의 실행 단계에서의 pc, ap, fp라는 특정 레지스터 값을 나열할 수 있고 이를 `execution trace` 라고 한다.

**보충 설명 : Cairo의 pc, ap, fp 레지스터**

- pc (program counter) : 현재 실행되는 instruction의 메모리 주소를 가리킨다.
- ap (allocation pointer) : [_convention_] 아직 사용되지 않은 메모리 주소 중 첫 주소를 가리키며, 프로그래머가 다른 방향으로 쓸 수도 있다.
- fp (frame pointer) : 현재 function의 스택 메모리 시작점을 가리키는 레지스터(cf. RISC-V의 sp)로, 함수가 시작되면 ap와 같은 주소를 가리키다가 함수가 리턴되면 다시 이전에 가리키던 주소를 가리킨다.

Cairo의 레지스터와 trace를 이해했다면, 다시 Cairo 프로그램의 증명 과정을 구체적으로 살펴보자.

## Cairo 프로그램의 증명 과정 : 1. Cairo Program 작성

하나의 Cairo program이 실행되는 과정을 이해하기 위해, 피보나치 프로그램을 예시로 살펴보자. 앞서 언급한 4단계의 과정 중 1단계에 해당한다.

1. **계산을 위한 Cairo 프로그램을 작성한다.**
2. 작성된 프로그램을 Cairo 바이트코드로 변환한다.
3. Cairo Runner가 바이트코드를 실행하여 execution trace S, partial memory function m\*, full memory function m을 얻는다.
4. STARK prover로 아래 statement에 대한 proof를 생성한다.

_"nondeterministic Cairo machine은 input이 ( T, m\*, pc_I, pc_F, ap_I, ap_F )일 때 accept 한다."_

j번째 피보나치 수를 구하는 프로그램의 Cairo assembly 코드는 다음과 같으며, 주석으로 각 라인의 설명과 해당 라인에서의 pc, ap, memory function을 나타내었다.

```
# 피보나치 수열을 (1, 1, ...)로 초기화한다.

[ap] = 1; ap++

# pc*{i+1} = pc_i + 2, ap*{i+1} = ap_i + 1, m(ap_i) = 1

[ap] = 1; ap++

# pc*{i+1} = pc_i + 2, ap*{i+1} = ap_i + 1, m(ap_i) = 1

body:

# j번째 피보나치 수를 구하기 위한 iteration counter를 하나 감소시킨다.

[ap] = [ap - 3] - 1; ap++

# pc*{i+1} = pc_i + 2, ap*{i+1} = ap_i + 1, m(ap_i) = m(ap_i - 3) - 1

# 이전 단계에서 마지막 피보나치 값을 복사한다.

[ap] = [ap - 2]; ap++

# pc*{i+1} = pc_i + 1, ap*{i+1} = ap_i + 1, m(ap_i) = m(ap_i - 2)

# 피보나치 수열의 다음 값을 계산한다.

[ap] = [ap - 3] + [ap - 4]; ap++

# pc*{i+1} = pc_i + 1, ap*{i+1} = ap_i + 1, m(ap_i) = m(ap_i - 3) + m(ap_i - 4)

# iteration counter가 0이 아니라면,

즉 j번째 피보나치 수 계산이 끝나지 않았다면 body로 점프한다.
jmp body if [ap - 3] != 0

# pc*{i+1} = m(ap_i - 3)이 0이면 pc_i + 2이고 아니면 pc_i + 4, ap*{i+1} = ap_i + 1

**end** :
jmp **end** # 무한루프

# pc*{i+1} = pc_i, ap*{i+1} = ap_i
```

위 Cairo assembly 코드가 동작하는 과정을 아래와 같이 도식화할 수 있다. (편의상 pc를 제외하고 memory function과 직접적으로 관련있는 ap만 도식화하였다.)

예시 코드에서의 j는 m(ap_I -1) = j, 즉 j번째 피보나치 수에서 j에 해당한다.

body 반복문에 진입하기 전, 처음 두 라인이 실행되면 (m(ap -3), m(ap -2), m(ap -1)) = (j, 1, 1)의 값을 가지며 body에 진입한 후 세 라인이 실행되면 (j-1, 1, 2)가 된다.

이후 (j-2, 2, 3) , (j-3, 3, 5), (j-4, 5, 8), (j-5, 8, 13) … 순으로 (m(ap -3), m(ap -2), m(ap -1)) 값이 변화하는데, 이를 보면 각 단계에서의 값이 곧 (**계산까지 남은 단계, 피보나치 계산을 위한 첫 번째 수, 피보나치 계산을 위한 두 번째 수**) 임을 알 수 있다.

아래 그림은 피보나치 수열이 (1, 1, 2, 3) 까지 계산된 상태에서 2 + 3 = 5를 계산하는 과정(j = 7, (j-2, 2, 3) ⇒ (j-3, 3, 5))에 해당한다.

![Cairo Assembly](/images/posts/cairo2.png)

## Cairo 프로그램의 증명 과정 : 2. Cairo Bytecode

Cairo assembler가 프로그램을 Cairo 바이트코드로 변환하며, 이 단계는 앞서 언급한 4단계 중 2단계에 해당한다.

1. 계산을 위한 Cairo 프로그램을 작성한다.
2. **작성된 프로그램을 Cairo 바이트코드로 변환한다.**
3. Cairo Runner가 바이트코드를 실행하여 execution trace S, partial memory function m\*, full memory function m을 얻는다.
4. STARK prover로 아래 statement에 대한 proof를 생성한다.

_"nondeterministic Cairo machine은 input이 ( T, m\*, pc_I, pc_F, ap_I, ap_F )일 때 `accept`` 한다."_

Cairo 바이트코드는 아래 요소들로 구성되어 있다.
![Cairo bytecode1](/images/posts/cairo3-1.png)
![Cairo bytecode2](/images/posts/cairo3-2.png)

- field element b의 sequence, 즉 b = (b0, … , b\_{|b|-1})
- 두 개의 index인 prog_start, prog_end

Cairo 바이트코드에는 프로그램을 실행하기 위해 필요한 정보가 들어있으며, 프로그램을 실행하고 싶다면 메모리 주소의 기본값인 pr(program base)를 고른 후 이에 맞게 partial memory function m\*과 pc_I, pc_F를 설정한다. 이는 프로그램을 실행할 때 필요한 메모리의 범위만 있다면 임의의 주소를 선택해 해당 주소부터 시작하여 사용할 수 있게 하기 위함이다.

partial memory function m* 은 m*(prog*base + i) = b_i, (i 는 [0, |b|])로 설정되며, pc_I와 pc_F는 각각 pc_I = prog_base + prog_start, pc_F = prog_base + prog_end로 설정된다. 즉 |b|개의 element인 b = ( b0 , … , b*{|b| -1})는 prog_base부터 prog_base + |b| 에 해당하는 주소의 메모리 값이다.

위 피보나치 프로그램에서 아래와 같은 바이트코드를 얻을 수 있다.

![Cairo bytecode3](/images/posts/cairo4.png)

prog_base를 0이라 가정하면, 이 바이트코드에 의해 partial memory function은 m*(0) = 0x480680017fff8000, m*(1) = 1, m*(2) = 0x480680017fff8000, … 와 같이 설정된다. pc값은 pc*I = 0 + 0, pc_F = 0 + 10로 설정된다.

실제로 위 피보나치 코드를 컴파일했을 때 아래와 같은 바이트코드를 얻었다. data 가 b = ( b0 , ... , b\*{|b| - 1})에 해당한다.

![Cairo compiled bytecode](/images/posts/cairo5.png)

## Cairo 프로그램의 증명 과정 : 3. Cairo Runner 실행

Cairo Runner는 컴파일된 Cairo 프로그램(위와 같은 바이트코드)을 실행하는 프로그램이다. Cairo Runner를 통해 프로그램을 실행하는 것이 세 번째 단계에 해당하며, 실행한 후 proof 생성에 필요한 값들을 얻을 수 있다.

1. 계산을 위한 Cairo 프로그램을 작성한다.
2. 작성된 프로그램을 Cairo 바이트코드로 변환한다.
3. **Cairo Runner가 바이트코드를 실행하여 execution trace S, partial memory function m\*, full memory function m을 얻는다.**
4. STARK prover로 아래 statement에 대한 proof를 생성한다.

_"nondeterministic Cairo machine은 input이 ( T, m_, pc*I, pc_F, ap_I, ap_F )일 때 `accept` 한다."*

Cairo Runner는 컴파일된 바이트코드를 실행하며 execution trace, partial memory function과 full memory function을 얻는다. 여기서 execution trace는 위에서 언급했듯이 pc, ap, fp 레지스터 값이며, partial memory function, full memory function은 프로그램이 실행되면서 사용된 메모리 값들에 해당한다.

Cairo Runner의 소스 코드는 현재 스타크웨어 [Github](https://github.com/starkware-libs/cairo-lang)에 공개되어 있으며 , 아래 코드는 Cairo Runner 소스 코드 중 컴파일된 json 파일에서 trace(pc, ap, fp)를 기록하는 부분에 해당한다.

```python
class CairoRunner:
    def **init**(
        self,
        program: ProgramBase,
        layout: str = "plain",
        memory: MemoryDict = None,
        proof*mode: Optional[bool] = None,
        allow_missing_builtins: Optional[bool] = None,
    ):
        self.program = program
        self.layout = layout
        self.builtin_runners: Dict[str, BuiltinRunner] = {}
        self.original_steps = None
        self.proof_mode = False if proof_mode is None else proof_mode
        self.allow_missing_builtins = (False if allow_missing_builtins None else allow_missing_builtins)
...
    def relocate(self):
        self.segment_offsets = self.segments.relocate_segments()
        self.relocated_memory = MemoryDict(
            {
                self.relocate_value(addr): self.relocate_value(value)
                for addr, value in self.vm_memory.items()
            }
        )
        self.relocated_trace = relocate_trace(
            self.vm.trace, self.segment_offsets, self.program.prime
        )
        for builtin_runner in self.builtin_runners.values():
            builtin_runner.relocate(self.relocate_value)
```

Cairo Runner 클래스의 메서드인 ` relocate`` 는  `relocate_trace`` 메서드를 통해 하나의 instruction을 실행하면서 self.relocated_trace를 업데이트한다.
relocate_trace 메서드는 현재까지의 trace와 instruction 정보를 받아 새로운 pc, ap, fp 값을 trace에 추가하여 반환한다.

```python
def relocate_trace(
    trace: List[TraceEntry[MaybeRelocatable]],
    segment_offsets: Dict[int, T],
    prime: int,
    allow_missing_segments: bool = False,
) -> List[TraceEntry[T]]:
    new_trace: List[TraceEntry[T]] = []
    def relocate_val(x):
        return relocate_value(x, segment_offsets, prime, allow_missing_segments)
    for entry in trace:
    new_trace.append(
        TraceEntry(
            pc=relocate_val(entry.pc),
            ap=relocate_val(entry.ap),
            fp=relocate_val(entry.fp),
        )
    )
    return new_trace
```

## Cairo 프로그램의 증명 과정 : 4. STARK proof 생성

Cairo Runner가 프로그램을 실행하여 execution trace를 포함한 output을 반환했다면, 이제 proof의 재료가 될 statement를 작성할 수 있다. STARK prover (StarkEx 서비스들은 SHARP - shared prover를 사용한다.)가 statement에 대한 proof를 만들게 되며, 이 과정이 Cairo를 통한 proof 생성의 마지막 단계에 해당한다.

1. 계산을 위한 Cairo 프로그램을 작성한다.
2. 작성된 프로그램을 Cairo 바이트코드로 변환한다.
3. Cairo Runner가 바이트코드를 실행하여 execution trace S, partial memory function m\*, full memory function m을 얻는다.
4. **STARK prover로 아래 statement에 대한 proof를 생성한다.**

**"nondeterministic Cairo machine은 input이 ( T, m\*, pc_I, pc_F, ap_I, ap_F )일 때 `accept` 한다."**

먼저 스타크웨어가 제시한 deterministic Cairo machine과 nondeterministic Cairo machine의 개념을 살펴보자.

_(수식을 담기 위해 개념 내용은 별도로 정리한 notion 페이지의 내용을 사용하였다.)_

![Cairo Machine1](/images/posts/cairo6.png)
![Cairo Machine2](/images/posts/cairo7.png)

proof로 만들고자 하는 statement를 다시 살펴보자.

**"nondeterministic Cairo machine은 input이 ( T, m\*, pc_I, pc_F, ap_I, ap_F )일 때 `accept` 한다."**

이 statement가 성립한다면, 즉 nondeterministic Cairo machine이 ( T, m\*, pc_I, pc_F, ap_I, ap_F )을 accept 한다면 deterministic Cairo machine이 accept 하는 input인 ( T, m, S )가 존재함을 나타낸다.

증명은 다음과 같다.

1. m은 m\*을 확장하기 때문에, m\*이 포함하는 Cairo 프로그램(편의상 피보나치 프로그램)의 바이트코드는 m에 포함된다. 따라서 프로그램의 모든 step에 대해 memory function을 확인할 수 있다.
2. pc_I = prog_base + prog_start이기 때문에 deterministic Cairo machine이 실행하는 첫 instruction은 피보나치 프로그램의 첫 instruction이다.
3. T개의 step동안 동일하게 실행된다.
4. pc_F = prog_base + prog_end이기 때문에, 피보나치 프로그램의 마지막 instruction 실행을 확인할 수 있다.

결론적으로 deterministic Cairo machine의 output이 accept 라면, 각 step마다 state (pc, ap, fp) transition이 모두 valid함을 나타내며 이는 Cairo로 작성된 프로그램 연산의 유효성을 보장한다.

이 연산의 유효성을 증명해줄 proof가 만들어지면 이는 온체인의 SHARP 컨트랙트로 전달된다. 현재 SHARP 컨트랙트는 이더리움 goerli [테스트넷](https://goerli.etherscan.io/address/0xAB43bA48c9edF4C2C4bB01237348D1D7B28ef168#readContract) 에 배포되어 있다.

SHARP 컨트랙트는 Fact Registry라는 컨트랙트에 fact라는 이름으로 증명(proof)을 작성하여 저장한다. 증명이 만들어졌으니 이를 검증해야 하고, 이 역할은 추후 설명할 Verifier Contract가 담당하게 된다.

![Cairo SHARP](/images/posts/cairo8.png)

이 fact가 온체인에 등록되었으므로 Verifier Contract는 유효성 검증을 위해 이를 사용할 수 있다. Verify Contract의 검증 로직은 이후 시리즈에서 다루기로 한다.

## 맺음말

스타크웨어는 범용적인 증명의 생성과 검증을 위해 Cairo 언어를 개발하였다. 이 언어가 어떻게 프로그램의 유효성을 증명하는지 살펴보았고, 결국 핵심은 메모리의 불변성을 기반으로 (pc, ap, fp)의 state transition을 통해 프로그램의 유효성을 증명하는 것이었다. 프로그램을 실행하는 것만으로도 유효성을 증명할 수 있다는 것, 또한 그 증명 과정에서 필요한 연산을 최소화했다는 것은 분명 L2 네트워크에서 지속가능한 확장성을 구현하는 데에 일조한다. 그러나 아직 StarkEx에 참여하는 프로젝트들 (dydx, Immutable X, Sorare, DeverseFi)의 Cairo로 작성된 비즈니스 로직이 아직까지 오픈소스로서 공개된 사항은 없으며, 이상적인 스타크웨어 생태계를 위해서는 Cairo의 적용이 더욱 확대되어야 한다. 이를 위해 본 게시글은 Cairo에 대한 아주 기본적인 이해를 돕고 있다.

내용 피드백과 추가적인 질문은 아래 연락처로 부탁드립니다.

email : lhm0710@snu.ac.kr

### Reference

[1] Lior Goldberg, Shahar Papini, and Michael Riabzev, "Cairo - a Turing-complete STARK-friendly CPU architecture", 2021
