var DamageCurve = [];
var ShotSpeedCurve = [];
var FireRateCurve = [];
var ProjectileCountCurve = [];
var MultiShotCurve = [];
var ProjectileSizeCurve = [];
var HealthCurve = [];
var DamageVal = 0;
var ShotSpeedVal = 0;
var FireRateVal = 0;
var ProjectileCountVal = 0;
var MultiShotVal = 0;
var ProjectileSizeVal = 0;
var HealthVal = 0;
for (let x = 0; x < 75; x++) {
    DamageVal = 10.472 + ((-0.00006 * x ^ 4) + (0.00598 * x ^ 3) - (0.00744 * x ^ 2) + (0.95992 * x) - 1.93696) / 4.1
    ShotSpeedVal = (0.000000004 * x ^ 4) + (0.000002506 * x ^ 3) + (0.007937004 * x ^ 2) + (0.752945336 * x) + 5.094244544
    FireRateVal = -0.195 * (x / 20 + 11.5 * 0.5) ^ 3 / 11.5 ^ 3 - 0.81666 * (x / 20 + 11.5 * 0.5) ^ 3 / 11.5 ^ 2 + 0.54833 * (x / 232 + 0.5) + 5
    ProjectileCountVal = ((Math.round(logx(x + 1, 1.6)) * 1.9) + 2.2) / 2.5;
    MultiShotVal = ((Math.round(logx(x + 1, 1.6)) * 1.9) + 2.2) / 2.5;
    ProjectileSizeVal = logx(45 * x + 1, 1.6)
    HealthVal = logx(x, 1.53994824906);
    DamageCurve.push(DamageVal);
    ShotSpeedCurve.push(ShotSpeedVal);
    FireRateCurve.push(FireRateVal);
    ProjectileCountCurve.push(ProjectileCountVal);
    MultiShotCurve.push(MultiShotVal);
    ProjectileSizeCurve.push(ProjectileSizeVal);
    HealthCurve.push(HealthVal);
}