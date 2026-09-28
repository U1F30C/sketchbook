/*
Based on Pereira, J. E., Caballero, M., Melo, J., Rincón, G., Jaimes, T., & Niño, R. (2016). Síndrome metabólico. Apuntes de Interés. Revista Cubana de Cardiología y Cirugía Cardiovascular, 22(2).
*/


highWHR(Sex, WHR) :-
    Sex = 'Male', WHR > 0.9 ;
    Sex = 'Female', WHR > 0.84.

lowHDL(Sex, HDL) :-
    Sex = 'Male', HDL < 35 ;
    Sex = 'Female', HDL < 39.

highBMI(BMI) :-
    BMI > 30.

high_syt_bp(SystolicBP) :-
    SystolicBP >= 140.

high_diast_bp(DiastolicBP) :-
    DiastolicBP >= 90.

highTriglycerides(Triglycerides) :-
    Triglycerides >= 150.

gaa(BloodGlucose) :-
    BloodGlucose >= 111,
    %WTF
    BloodGlucose =< 125.

ada(BloodGlucose) :-
    BloodGlucose >= 126,
    BloodGlucose < 140.

dm_oms(BloodGlucose) :-
    BloodGlucose >= 149,
    %WTF
    BloodGlucose =< 199.

sum_highWHR(Sex, WHR, Current, Sum) :-                 highWHR(Sex, WHR),                 write('highWHR'),             nl,   Sum is Current + 1; Sum is Current.
sum_lowHDL(Sex, HDL, Current, Sum) :-                  lowHDL(Sex, HDL),                  write('lowHDL'),              nl,   Sum is Current + 1; Sum is Current.
sum_highBMI(BMI, Current, Sum) :-                      highBMI(BMI),                      write('highBMI'),             nl,   Sum is Current + 1; Sum is Current.
sum_high_syt_bp(SystolicBP, Current, Sum) :-           high_syt_bp(SystolicBP),           write('high_syt_bp'),         nl,   Sum is Current + 1; Sum is Current.
sum_high_diast_bp(DiastolicBP, Current, Sum) :-        high_diast_bp(DiastolicBP),        write('high_diast_bp'),       nl,   Sum is Current + 1; Sum is Current.
sum_highTriglycerides(Triglycerides, Current, Sum) :-  highTriglycerides(Triglycerides),  write('highTriglycerides'),   nl,   Sum is Current + 1; Sum is Current.
sum_gaa(BloodGlucose, Current, Sum) :-                 gaa(BloodGlucose),                 write('gaa'),                 nl,   Sum is Current + 1; Sum is Current.
sum_ada(BloodGlucose, Current, Sum) :-                 ada(BloodGlucose),                 write('ada'),                 nl,   Sum is Current + 1; Sum is Current.
sum_dm_oms(BloodGlucose, Current, Sum) :-              dm_oms(BloodGlucose),              write('dm_oms'),              nl,   Sum is Current + 1; Sum is Current.


count_factors(Sex, WHR, HDL, BMI, SystolicBP, DiastolicBP, Triglycerides, BloodGlucose, Count) :-
    sum_highWHR(Sex, WHR, 0, A),
    sum_lowHDL(Sex, HDL, A, B),
    sum_highBMI(BMI, B, C),
    sum_high_syt_bp(SystolicBP, C, D),
    sum_high_diast_bp(DiastolicBP, D, E),
    sum_highTriglycerides(Triglycerides, E, F),
    sum_gaa(BloodGlucose, F, G),
    sum_ada(BloodGlucose, G, H),
    sum_dm_oms(BloodGlucose, H, Sum),
    Count is Sum, !.

diagnose_factors(FactorsCount, RiskCategory) :-
    FactorsCount = 0, RiskCategory = 'VeryLow';
    FactorsCount = 1, RiskCategory = 'Low';
    FactorsCount >= 2, FactorsCount < 4, RiskCategory = 'Medium';
    FactorsCount >= 4, RiskCategory = 'High'.
    
diagnose_ms_risk(Sex, WHR, HDL, BMI, SystolicBP, DiastolicBP, Triglycerides, BloodGlucose, RiskCategory) :-
    count_factors(Sex, WHR, HDL, BMI, SystolicBP, DiastolicBP, Triglycerides, BloodGlucose, Count),
    diagnose_factors(Count, RiskCategory).


/*

highWHR('Male', float(0.99)).
count_factors('Male', float(1.1), float(1.1), float(1.1), float(1.1), float(1.1), float(1.1), float(1.1), X).
diagnose_ms_risk('Male', float(1.1), float(1.1), float(1.1), float(1.1), float(1.1), float(1.1), float(1.1), X).

*/
