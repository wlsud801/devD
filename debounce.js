// 동작 순서
// 1. eventHandler를 통한 이벤트가 실행된다.
// 2. debounce 함수가 실행된다.
// 3. debounce함수는 promise를 return 하고, resolve를 통해 func 인자로 받은 함수가 실행된다.
// 4. 함수가 정상적으로 실행 완료되면(then) promise가 해결된다.

function debounce(func, wait = 1000, immediate = true) {
    let timeout;

    function debounced() {
        return new Promise((resolve, reject) => {
            // 즉시 호출 설정이 활성화되어 있고, 타이머가 설정되지 않았을 때
            if (timeout === undefined && immediate) {
                resolve(func());
                console.log('첫번째 바로 실행');
                timeout = null;
            } else {
                // 기존 타이머를 취소하고 새로운 타이머 설정
                // 타임아웃의 시간이 다 되기전에 새로운 입력이 들어오면 다시 clearTimeout이 작동
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    resolve(func());
                    timeout = null;
                }, wait);
            }
            // 함수가 실행이 모두 완료되면 그 후에 promise 해결
        })
            .then(() => {
                console.log('프로미스 해결');
            })
            .catch(() => {
                console.log('프로미스 실패');
            });
    }

    function cancel() {
        clearTimeout(timeout);
        timeout = null;
    }

    return { debounced, cancel };
}
