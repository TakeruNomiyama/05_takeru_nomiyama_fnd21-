'use strict'
// 1行目に記載している 'use strict' は削除しないでください

'use strict';

function test(actual, expected) {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    console.log('OK! Test PASSED.');
  } else {
    console.error('Test FAILED. Try again!');
    console.log('    actual: ', actual);
    console.log('  expected: ', expected);
    console.trace();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const unitSelect = document.getElementById('unitSelect');
  const frontWeight = document.getElementById('frontWeight');
  const rearWeight = document.getElementById('rearWeight');
  const frontLeftBrake = document.getElementById('frontLeftBrake');
  const frontRightBrake = document.getElementById('frontRightBrake');
  const rearLeftBrake = document.getElementById('rearLeftBrake');
  const rearRightBrake = document.getElementById('rearRightBrake');
  const rightParkingBrake = document.getElementById('rightParkingBrake');
  const leftParkingBrake = document.getElementById('leftParkingBrake');

  const rearResult = document.getElementById('rearResult');
  const frontResult = document.getElementById('frontResult');
  const sideBrakeResult = document.getElementById('sideBrakeResult');
  const rearDifResult = document.getElementById('rearDifResult');
  const frontDifResult = document.getElementById('frontDifResult');
  const totalBrakingResult = document.getElementById('totalBrakingResult');
  const judgmentResult = document.getElementById('judgmentResult');
  const calculateButton = document.getElementById('calculateButton');

  calculateButton.addEventListener('click', function () {
    const unit = unitSelect.value;
    const frontWeightValue = parseFloat(frontWeight.value);
    const rearWeightValue = parseFloat(rearWeight.value);
    const frontLeftBrakeValue = parseFloat(frontLeftBrake.value);
    const frontRightBrakeValue = parseFloat(frontRightBrake.value);
    const rearLeftBrakeValue = parseFloat(rearLeftBrake.value);
    const rearRightBrakeValue = parseFloat(rearRightBrake.value);
    const rightParkingBrakeValue = parseFloat(rightParkingBrake.value);
    const leftParkingBrakeValue = parseFloat(leftParkingBrake.value);

    // 計算式
    const frontValue = frontLeftBrakeValue + frontRightBrakeValue;
    const rearValue = rearLeftBrakeValue + rearRightBrakeValue;
    const sideBrakeResultValue = rightParkingBrakeValue + leftParkingBrakeValue;
    const frontDifResultValue = (Math.abs(frontLeftBrakeValue - frontRightBrakeValue) / frontWeightValue).toFixed(2);
    const rearDifResultValue = (Math.abs(rearLeftBrakeValue - rearRightBrakeValue) / rearWeightValue).toFixed(2);
    const totalBrakingResultValue = ((frontValue + rearValue) / (frontWeightValue + rearWeightValue)).toFixed(2);

    // 合否判定
    const rearDifPass = rearDifResultValue <= 0.78;
    const frontDifPass = frontDifResultValue <= 0.78;
    const sideBrakePass = sideBrakeResultValue >= 1.96;
    const totalBrakingPass = totalBrakingResultValue >= 4.90;
    const rearBrakingPass = (rearValue / rearWeightValue) >= 0.98;

    // 合否判定結果のテキスト
    const rearDifText = rearDifPass ? '◯' : '✕';
    const frontDifText = frontDifPass ? '◯' : '✕';
    const sideBrakeText = sideBrakePass ? '◯' : '✕';
    const totalBrakingText = totalBrakingPass ? '◯' : '✕';
    const rearBrakingText = rearBrakingPass ? '◯' : '✕';

    // 結果表示
    rearResult.textContent = `${rearValue} ${unit}`;
    frontResult.textContent = `${frontValue} ${unit}`;
    sideBrakeResult.textContent = `${sideBrakeResultValue} ${unit}`;
    rearDifResult.textContent = `${rearDifResultValue} ${unit} (${rearDifText})`;
    frontDifResult.textContent = `${frontDifResultValue} ${unit} (${frontDifText})`;
    totalBrakingResult.textContent = `${totalBrakingResultValue} ${unit} (${totalBrakingText})`;

    // 判定結果
    judgmentResult.innerHTML = `
          <p>後軸左右差: ${rearDifText}</p>
          <p>前軸左右差: ${frontDifText}</p>
          <p>サイドブレーキ制動力: ${sideBrakeText}</p>
          <p>総和制動力: ${totalBrakingText}</p>
          <p>後輪制動力: ${rearBrakingText}</p>
      `;
  });
});
