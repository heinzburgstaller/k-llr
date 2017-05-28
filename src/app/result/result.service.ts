import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ResultService {

  private csv_result: string = `age, education-num, hours-per-week, workclass, native-country, sex, race, marital-status, relationship, occupation, income
41, 13, 42.5, *, United-States, Male, White, *, *, *, <=50K
41, 13, 42.5, *, United-States, Male, White, *, *, *, >50K
41, 13, 42.5, *, United-States, Male, White, *, *, *, <=50K
41, 13, 42.5, *, United-States, Male, White, *, *, *, >50K
41, 13, 42.5, *, United-States, Male, White, *, *, *, <=50K
41, 13, 42.5, *, United-States, Male, White, *, *, *, <=50K
41, 13, 42.5, *, United-States, Male, White, *, *, *, >50K
53, 13, 26.5, *, America, Male, White, Married-civ-spouse, Husband, *, <=50K
53, 13, 26.5, *, America, Male, White, Married-civ-spouse, Husband, *, >50K
53, 13, 26.5, *, America, Male, White, Married-civ-spouse, Husband, *, <=50K
53, 13, 26.5, *, America, Male, White, Married-civ-spouse, Husband, *, <=50K
53, 13, 26.5, *, America, Male, White, Married-civ-spouse, Husband, *, <=50K
53, 13, 26.5, *, America, Male, White, Married-civ-spouse, Husband, *, >50K
53, 13, 26.5, *, America, Male, White, Married-civ-spouse, Husband, *, >50K
38.5, 9.5, 40, Private, United-States, Male, White, *, *, manual-labor, <=50K
38.5, 9.5, 40, Private, United-States, Male, White, *, *, manual-labor, <=50K
38.5, 9.5, 40, Private, United-States, Male, White, *, *, manual-labor, <=50K
38.5, 9.5, 40, Private, United-States, Male, White, *, *, manual-labor, <=50K
38.5, 9.5, 40, Private, United-States, Male, White, *, *, manual-labor, >50K
38.5, 9.5, 40, Private, United-States, Male, White, *, *, manual-labor, <=50K
38.5, 9.5, 40, Private, United-States, Male, White, *, *, manual-labor, <=50K
55.5, 8, 40, *, United-States, Male, *, Married-civ-spouse, Husband, *, <=50K
55.5, 8, 40, *, United-States, Male, *, Married-civ-spouse, Husband, *, <=50K
55.5, 8, 40, *, United-States, Male, *, Married-civ-spouse, Husband, *, >50K
55.5, 8, 40, *, United-States, Male, *, Married-civ-spouse, Husband, *, <=50K
55.5, 8, 40, *, United-States, Male, *, Married-civ-spouse, Husband, *, <=50K
55.5, 8, 40, *, United-States, Male, *, Married-civ-spouse, Husband, *, <=50K
55.5, 8, 40, *, United-States, Male, *, Married-civ-spouse, Husband, *, <=50K
30.5, 13, 40, Private, *, *, *, *, *, *, <=50K
30.5, 13, 40, Private, *, *, *, *, *, *, <=50K
30.5, 13, 40, Private, *, *, *, *, *, *, <=50K
30.5, 13, 40, Private, *, *, *, *, *, *, <=50K
30.5, 13, 40, Private, *, *, *, *, *, *, <=50K
30.5, 13, 40, Private, *, *, *, *, *, *, <=50K
30.5, 13, 40, Private, *, *, *, *, *, *, <=50K
40.5, 14.5, 40, *, *, *, White, *, *, *, <=50K
40.5, 14.5, 40, *, *, *, White, *, *, *, <=50K
40.5, 14.5, 40, *, *, *, White, *, *, *, >50K
40.5, 14.5, 40, *, *, *, White, *, *, *, >50K
40.5, 14.5, 40, *, *, *, White, *, *, *, >50K
40.5, 14.5, 40, *, *, *, White, *, *, *, >50K
40.5, 14.5, 40, *, *, *, White, *, *, *, <=50K
54, 5.5, 28, *, America, *, *, *, *, *, <=50K
54, 5.5, 28, *, America, *, *, *, *, *, >50K
54, 5.5, 28, *, America, *, *, *, *, *, <=50K
54, 5.5, 28, *, America, *, *, *, *, *, <=50K
54, 5.5, 28, *, America, *, *, *, *, *, <=50K
54, 5.5, 28, *, America, *, *, *, *, *, <=50K
54, 5.5, 28, *, America, *, *, *, *, *, <=50K
55.5, 9, 47.5, *, North-America, Male, White, Married-civ-spouse, Husband, *, >50K
55.5, 9, 47.5, *, North-America, Male, White, Married-civ-spouse, Husband, *, <=50K
55.5, 9, 47.5, *, North-America, Male, White, Married-civ-spouse, Husband, *, >50K
55.5, 9, 47.5, *, North-America, Male, White, Married-civ-spouse, Husband, *, <=50K
55.5, 9, 47.5, *, North-America, Male, White, Married-civ-spouse, Husband, *, >50K
55.5, 9, 47.5, *, North-America, Male, White, Married-civ-spouse, Husband, *, <=50K
55.5, 9, 47.5, *, North-America, Male, White, Married-civ-spouse, Husband, *, >50K
32.5, 14, 50, Private, United-States, *, White, *, *, Prof-specialty, >50K
32.5, 14, 50, Private, United-States, *, White, *, *, Prof-specialty, <=50K
32.5, 14, 50, Private, United-States, *, White, *, *, Prof-specialty, <=50K
32.5, 14, 50, Private, United-States, *, White, *, *, Prof-specialty, <=50K
32.5, 14, 50, Private, United-States, *, White, *, *, Prof-specialty, >50K
32.5, 14, 50, Private, United-States, *, White, *, *, Prof-specialty, <=50K
32.5, 14, 50, Private, United-States, *, White, *, *, Prof-specialty, >50K
39, 12, 80, *, *, Male, *, *, *, *, >50K
39, 12, 80, *, *, Male, *, *, *, *, <=50K
39, 12, 80, *, *, Male, *, *, *, *, >50K
39, 12, 80, *, *, Male, *, *, *, *, >50K
39, 12, 80, *, *, Male, *, *, *, *, <=50K
39, 12, 80, *, *, Male, *, *, *, *, >50K
39, 12, 80, *, *, Male, *, *, *, *, >50K
33, 13, 40, *, *, *, *, *, *, *, >50K
33, 13, 40, *, *, *, *, *, *, *, >50K
33, 13, 40, *, *, *, *, *, *, *, >50K
33, 13, 40, *, *, *, *, *, *, *, <=50K
33, 13, 40, *, *, *, *, *, *, *, >50K
33, 13, 40, *, *, *, *, *, *, *, >50K
33, 13, 40, *, *, *, *, *, *, *, >50K
24.5, 13, 35, Private, United-States, *, White, Never-married, *, *, <=50K
24.5, 13, 35, Private, United-States, *, White, Never-married, *, *, <=50K
24.5, 13, 35, Private, United-States, *, White, Never-married, *, *, <=50K
24.5, 13, 35, Private, United-States, *, White, Never-married, *, *, <=50K
24.5, 13, 35, Private, United-States, *, White, Never-married, *, *, <=50K
24.5, 13, 35, Private, United-States, *, White, Never-married, *, *, <=50K
24.5, 13, 35, Private, United-States, *, White, Never-married, *, *, <=50K
37, 12.5, 50, Private, *, *, *, *, *, *, <=50K
37, 12.5, 50, Private, *, *, *, *, *, *, <=50K
37, 12.5, 50, Private, *, *, *, *, *, *, <=50K
37, 12.5, 50, Private, *, *, *, *, *, *, <=50K
37, 12.5, 50, Private, *, *, *, *, *, *, >50K
37, 12.5, 50, Private, *, *, *, *, *, *, <=50K
37, 12.5, 50, Private, *, *, *, *, *, *, <=50K
37, 4.5, 45, *, *, Male, *, Married-civ-spouse, Husband, manual-labor, <=50K
37, 4.5, 45, *, *, Male, *, Married-civ-spouse, Husband, manual-labor, <=50K
37, 4.5, 45, *, *, Male, *, Married-civ-spouse, Husband, manual-labor, <=50K
37, 4.5, 45, *, *, Male, *, Married-civ-spouse, Husband, manual-labor, <=50K
37, 4.5, 45, *, *, Male, *, Married-civ-spouse, Husband, manual-labor, >50K
37, 4.5, 45, *, *, Male, *, Married-civ-spouse, Husband, manual-labor, <=50K
37, 4.5, 45, *, *, Male, *, Married-civ-spouse, Husband, manual-labor, <=50K
26, 9, 37.5, Self, United-States, Male, White, Never-married, *, *, <=50K
26, 9, 37.5, Self, United-States, Male, White, Never-married, *, *, <=50K
26, 9, 37.5, Self, United-States, Male, White, Never-married, *, *, <=50K
26, 9, 37.5, Self, United-States, Male, White, Never-married, *, *, <=50K
26, 9, 37.5, Self, United-States, Male, White, Never-married, *, *, <=50K
26, 9, 37.5, Self, United-States, Male, White, Never-married, *, *, <=50K
26, 9, 37.5, Self, United-States, Male, White, Never-married, *, *, <=50K
34, 9, 40, Private, United-States, *, *, Never-married, *, *, <=50K
34, 9, 40, Private, United-States, *, *, Never-married, *, *, <=50K
34, 9, 40, Private, United-States, *, *, Never-married, *, *, <=50K
34, 9, 40, Private, United-States, *, *, Never-married, *, *, <=50K
34, 9, 40, Private, United-States, *, *, Never-married, *, *, <=50K
34, 9, 40, Private, United-States, *, *, Never-married, *, *, <=50K
34, 9, 40, Private, United-States, *, *, Never-married, *, *, <=50K
40.5, 8.5, 50, *, United-States, Male, *, Married-civ-spouse, Husband, *, <=50K
40.5, 8.5, 50, *, United-States, Male, *, Married-civ-spouse, Husband, *, <=50K
40.5, 8.5, 50, *, United-States, Male, *, Married-civ-spouse, Husband, *, <=50K
40.5, 8.5, 50, *, United-States, Male, *, Married-civ-spouse, Husband, *, <=50K
40.5, 8.5, 50, *, United-States, Male, *, Married-civ-spouse, Husband, *, <=50K
40.5, 8.5, 50, *, United-States, Male, *, Married-civ-spouse, Husband, *, <=50K
40.5, 8.5, 50, *, United-States, Male, *, Married-civ-spouse, Husband, *, <=50K
46, 14, 47.5, *, United-States, *, *, *, *, *, >50K
46, 14, 47.5, *, United-States, *, *, *, *, *, <=50K
46, 14, 47.5, *, United-States, *, *, *, *, *, <=50K
46, 14, 47.5, *, United-States, *, *, *, *, *, >50K
46, 14, 47.5, *, United-States, *, *, *, *, *, <=50K
46, 14, 47.5, *, United-States, *, *, *, *, *, >50K
46, 14, 47.5, *, United-States, *, *, *, *, *, <=50K
44.5, 16, 60, *, America, *, White, *, *, *, >50K
44.5, 16, 60, *, America, *, White, *, *, *, >50K
44.5, 16, 60, *, America, *, White, *, *, *, >50K
44.5, 16, 60, *, America, *, White, *, *, *, >50K
44.5, 16, 60, *, America, *, White, *, *, *, >50K
44.5, 16, 60, *, America, *, White, *, *, *, <=50K
44.5, 16, 60, *, America, *, White, *, *, *, >50K
60.5, 10, 22, *, United-States, *, *, *, *, *, <=50K
60.5, 10, 22, *, United-States, *, *, *, *, *, <=50K
60.5, 10, 22, *, United-States, *, *, *, *, *, <=50K
60.5, 10, 22, *, United-States, *, *, *, *, *, <=50K
60.5, 10, 22, *, United-States, *, *, *, *, *, <=50K
60.5, 10, 22, *, United-States, *, *, *, *, *, <=50K
60.5, 10, 22, *, United-States, *, *, *, *, *, <=50K
45.5, 8, 40, *, United-States, Male, *, Married-civ-spouse, Husband, *, <=50K
45.5, 8, 40, *, United-States, Male, *, Married-civ-spouse, Husband, *, <=50K
45.5, 8, 40, *, United-States, Male, *, Married-civ-spouse, Husband, *, <=50K
45.5, 8, 40, *, United-States, Male, *, Married-civ-spouse, Husband, *, <=50K
45.5, 8, 40, *, United-States, Male, *, Married-civ-spouse, Husband, *, <=50K
45.5, 8, 40, *, United-States, Male, *, Married-civ-spouse, Husband, *, <=50K
45.5, 8, 40, *, United-States, Male, *, Married-civ-spouse, Husband, *, <=50K
61, 9, 40, *, United-States, *, White, *, *, *, <=50K
61, 9, 40, *, United-States, *, White, *, *, *, <=50K
61, 9, 40, *, United-States, *, White, *, *, *, <=50K
61, 9, 40, *, United-States, *, White, *, *, *, >50K
61, 9, 40, *, United-States, *, White, *, *, *, >50K
61, 9, 40, *, United-States, *, White, *, *, *, >50K
61, 9, 40, *, United-States, *, White, *, *, *, <=50K
21, 9, 40, Private, United-States, *, *, Never-married, Own-child, *, <=50K
21, 9, 40, Private, United-States, *, *, Never-married, Own-child, *, <=50K
21, 9, 40, Private, United-States, *, *, Never-married, Own-child, *, <=50K
21, 9, 40, Private, United-States, *, *, Never-married, Own-child, *, <=50K
21, 9, 40, Private, United-States, *, *, Never-married, Own-child, *, <=50K
21, 9, 40, Private, United-States, *, *, Never-married, Own-child, *, <=50K
21, 9, 40, Private, United-States, *, *, Never-married, Own-child, *, <=50K
51.5, 9.5, 40, *, United-States, Male, *, *, *, *, <=50K
51.5, 9.5, 40, *, United-States, Male, *, *, *, *, >50K
51.5, 9.5, 40, *, United-States, Male, *, *, *, *, >50K
51.5, 9.5, 40, *, United-States, Male, *, *, *, *, >50K
51.5, 9.5, 40, *, United-States, Male, *, *, *, *, <=50K
51.5, 9.5, 40, *, United-States, Male, *, *, *, *, <=50K
51.5, 9.5, 40, *, United-States, Male, *, *, *, *, <=50K
26, 12.5, 54, *, United-States, Male, White, *, *, *, <=50K
26, 12.5, 54, *, United-States, Male, White, *, *, *, <=50K
26, 12.5, 54, *, United-States, Male, White, *, *, *, <=50K
26, 12.5, 54, *, United-States, Male, White, *, *, *, <=50K
26, 12.5, 54, *, United-States, Male, White, *, *, *, <=50K
26, 12.5, 54, *, United-States, Male, White, *, *, *, <=50K
26, 12.5, 54, *, United-States, Male, White, *, *, *, >50K
20.5, 10, 44.5, Private, United-States, *, *, Never-married, Own-child, *, <=50K
20.5, 10, 44.5, Private, United-States, *, *, Never-married, Own-child, *, <=50K
20.5, 10, 44.5, Private, United-States, *, *, Never-married, Own-child, *, <=50K
20.5, 10, 44.5, Private, United-States, *, *, Never-married, Own-child, *, <=50K
20.5, 10, 44.5, Private, United-States, *, *, Never-married, Own-child, *, <=50K
20.5, 10, 44.5, Private, United-States, *, *, Never-married, Own-child, *, <=50K
20.5, 10, 44.5, Private, United-States, *, *, Never-married, Own-child, *, <=50K
46, 13, 40, *, United-States, *, White, *, *, *, <=50K
46, 13, 40, *, United-States, *, White, *, *, *, >50K
46, 13, 40, *, United-States, *, White, *, *, *, <=50K
46, 13, 40, *, United-States, *, White, *, *, *, <=50K
46, 13, 40, *, United-States, *, White, *, *, *, <=50K
46, 13, 40, *, United-States, *, White, *, *, *, <=50K
46, 13, 40, *, United-States, *, White, *, *, *, >50K
30.5, 10, 40, *, United-States, *, White, *, *, *, <=50K
30.5, 10, 40, *, United-States, *, White, *, *, *, <=50K
30.5, 10, 40, *, United-States, *, White, *, *, *, <=50K
30.5, 10, 40, *, United-States, *, White, *, *, *, <=50K
30.5, 10, 40, *, United-States, *, White, *, *, *, <=50K
30.5, 10, 40, *, United-States, *, White, *, *, *, <=50K
30.5, 10, 40, *, United-States, *, White, *, *, *, <=50K
23.5, 10, 20, *, United-States, *, *, *, *, *, <=50K
23.5, 10, 20, *, United-States, *, *, *, *, *, <=50K
23.5, 10, 20, *, United-States, *, *, *, *, *, <=50K
23.5, 10, 20, *, United-States, *, *, *, *, *, <=50K
23.5, 10, 20, *, United-States, *, *, *, *, *, <=50K
23.5, 10, 20, *, United-States, *, *, *, *, *, <=50K
23.5, 10, 20, *, United-States, *, *, *, *, *, <=50K
48.5, 8, 43, *, America, *, *, *, *, *, <=50K
48.5, 8, 43, *, America, *, *, *, *, *, <=50K
48.5, 8, 43, *, America, *, *, *, *, *, <=50K
48.5, 8, 43, *, America, *, *, *, *, *, <=50K
48.5, 8, 43, *, America, *, *, *, *, *, <=50K
48.5, 8, 43, *, America, *, *, *, *, *, <=50K
48.5, 8, 43, *, America, *, *, *, *, *, <=50K
23.5, 9.5, 26.5, Private, United-States, Female, *, *, *, *, <=50K
23.5, 9.5, 26.5, Private, United-States, Female, *, *, *, *, <=50K
23.5, 9.5, 26.5, Private, United-States, Female, *, *, *, *, <=50K
23.5, 9.5, 26.5, Private, United-States, Female, *, *, *, *, <=50K
23.5, 9.5, 26.5, Private, United-States, Female, *, *, *, *, <=50K
23.5, 9.5, 26.5, Private, United-States, Female, *, *, *, *, <=50K
23.5, 9.5, 26.5, Private, United-States, Female, *, *, *, *, <=50K
49, 12, 41, Self, *, *, White, *, *, *, <=50K
49, 12, 41, Self, *, *, White, *, *, *, <=50K
49, 12, 41, Self, *, *, White, *, *, *, <=50K
49, 12, 41, Self, *, *, White, *, *, *, <=50K
49, 12, 41, Self, *, *, White, *, *, *, <=50K
49, 12, 41, Self, *, *, White, *, *, *, <=50K
49, 12, 41, Self, *, *, White, *, *, *, <=50K
59.5, 13.5, 45, *, United-States, *, *, *, *, *, >50K
59.5, 13.5, 45, *, United-States, *, *, *, *, *, >50K
59.5, 13.5, 45, *, United-States, *, *, *, *, *, <=50K
59.5, 13.5, 45, *, United-States, *, *, *, *, *, >50K
59.5, 13.5, 45, *, United-States, *, *, *, *, *, >50K
59.5, 13.5, 45, *, United-States, *, *, *, *, *, >50K
59.5, 13.5, 45, *, United-States, *, *, *, *, *, >50K
42, 11, 40, *, United-States, Male, *, Married-civ-spouse, Husband, *, <=50K
42, 11, 40, *, United-States, Male, *, Married-civ-spouse, Husband, *, >50K
42, 11, 40, *, United-States, Male, *, Married-civ-spouse, Husband, *, >50K
42, 11, 40, *, United-States, Male, *, Married-civ-spouse, Husband, *, >50K
42, 11, 40, *, United-States, Male, *, Married-civ-spouse, Husband, *, >50K
42, 11, 40, *, United-States, Male, *, Married-civ-spouse, Husband, *, >50K
42, 11, 40, *, United-States, Male, *, Married-civ-spouse, Husband, *, >50K
31, 11.5, 44, Private, *, Male, *, *, *, *, <=50K
31, 11.5, 44, Private, *, Male, *, *, *, *, >50K
31, 11.5, 44, Private, *, Male, *, *, *, *, <=50K
31, 11.5, 44, Private, *, Male, *, *, *, *, <=50K
31, 11.5, 44, Private, *, Male, *, *, *, *, <=50K
31, 11.5, 44, Private, *, Male, *, *, *, *, <=50K
31, 11.5, 44, Private, *, Male, *, *, *, *, <=50K
26.5, 10, 40, Private, *, *, *, *, *, *, <=50K
26.5, 10, 40, Private, *, *, *, *, *, *, <=50K
26.5, 10, 40, Private, *, *, *, *, *, *, <=50K
26.5, 10, 40, Private, *, *, *, *, *, *, <=50K
26.5, 10, 40, Private, *, *, *, *, *, *, <=50K
26.5, 10, 40, Private, *, *, *, *, *, *, <=50K
26.5, 10, 40, Private, *, *, *, *, *, *, <=50K
50, 13, 57.5, *, United-States, Male, *, *, *, *, >50K
50, 13, 57.5, *, United-States, Male, *, *, *, *, >50K
50, 13, 57.5, *, United-States, Male, *, *, *, *, <=50K
50, 13, 57.5, *, United-States, Male, *, *, *, *, >50K
50, 13, 57.5, *, United-States, Male, *, *, *, *, <=50K
50, 13, 57.5, *, United-States, Male, *, *, *, *, >50K
50, 13, 57.5, *, United-States, Male, *, *, *, *, >50K
51, 9.5, 60, Self, United-States, Male, White, *, *, *, <=50K
51, 9.5, 60, Self, United-States, Male, White, *, *, *, >50K
51, 9.5, 60, Self, United-States, Male, White, *, *, *, <=50K
51, 9.5, 60, Self, United-States, Male, White, *, *, *, <=50K
51, 9.5, 60, Self, United-States, Male, White, *, *, *, <=50K
51, 9.5, 60, Self, United-States, Male, White, *, *, *, >50K
51, 9.5, 60, Self, United-States, Male, White, *, *, *, >50K
49.5, 4, 45, *, America, *, White, *, *, *, <=50K
49.5, 4, 45, *, America, *, White, *, *, *, <=50K
49.5, 4, 45, *, America, *, White, *, *, *, <=50K
49.5, 4, 45, *, America, *, White, *, *, *, <=50K
49.5, 4, 45, *, America, *, White, *, *, *, <=50K
49.5, 4, 45, *, America, *, White, *, *, *, <=50K
49.5, 4, 45, *, America, *, White, *, *, *, <=50K
36, 11.5, 45, *, America, Male, White, Married-civ-spouse, Husband, *, <=50K
36, 11.5, 45, *, America, Male, White, Married-civ-spouse, Husband, *, >50K
36, 11.5, 45, *, America, Male, White, Married-civ-spouse, Husband, *, >50K
36, 11.5, 45, *, America, Male, White, Married-civ-spouse, Husband, *, >50K
36, 11.5, 45, *, America, Male, White, Married-civ-spouse, Husband, *, <=50K
36, 11.5, 45, *, America, Male, White, Married-civ-spouse, Husband, *, >50K
36, 11.5, 45, *, America, Male, White, Married-civ-spouse, Husband, *, >50K
33, 9, 42.5, *, United-States, Male, White, Married-civ-spouse, Husband, *, <=50K
33, 9, 42.5, *, United-States, Male, White, Married-civ-spouse, Husband, *, >50K
33, 9, 42.5, *, United-States, Male, White, Married-civ-spouse, Husband, *, <=50K
33, 9, 42.5, *, United-States, Male, White, Married-civ-spouse, Husband, *, >50K
33, 9, 42.5, *, United-States, Male, White, Married-civ-spouse, Husband, *, >50K
33, 9, 42.5, *, United-States, Male, White, Married-civ-spouse, Husband, *, <=50K
33, 9, 42.5, *, United-States, Male, White, Married-civ-spouse, Husband, *, <=50K
44.5, 16, 50, *, United-States, *, White, *, *, *, >50K
44.5, 16, 50, *, United-States, *, White, *, *, *, >50K
44.5, 16, 50, *, United-States, *, White, *, *, *, >50K
44.5, 16, 50, *, United-States, *, White, *, *, *, <=50K
44.5, 16, 50, *, United-States, *, White, *, *, *, <=50K
44.5, 16, 50, *, United-States, *, White, *, *, *, >50K
44.5, 16, 50, *, United-States, *, White, *, *, *, <=50K
32, 10.5, 61, *, United-States, *, *, *, Not-in-family, *, <=50K
32, 10.5, 61, *, United-States, *, *, *, Not-in-family, *, <=50K
32, 10.5, 61, *, United-States, *, *, *, Not-in-family, *, <=50K
32, 10.5, 61, *, United-States, *, *, *, Not-in-family, *, <=50K
32, 10.5, 61, *, United-States, *, *, *, Not-in-family, *, <=50K
32, 10.5, 61, *, United-States, *, *, *, Not-in-family, *, <=50K
32, 10.5, 61, *, United-States, *, *, *, Not-in-family, *, <=50K
59, 9, 40, Self, United-States, *, *, *, *, *, >50K
59, 9, 40, Self, United-States, *, *, *, *, *, >50K
59, 9, 40, Self, United-States, *, *, *, *, *, <=50K
59, 9, 40, Self, United-States, *, *, *, *, *, >50K
59, 9, 40, Self, United-States, *, *, *, *, *, <=50K
59, 9, 40, Self, United-States, *, *, *, *, *, <=50K
59, 9, 40, Self, United-States, *, *, *, *, *, >50K
21, 10, 36, Private, America, Male, *, *, *, *, <=50K
21, 10, 36, Private, America, Male, *, *, *, *, <=50K
21, 10, 36, Private, America, Male, *, *, *, *, <=50K
21, 10, 36, Private, America, Male, *, *, *, *, <=50K
21, 10, 36, Private, America, Male, *, *, *, *, <=50K
21, 10, 36, Private, America, Male, *, *, *, *, <=50K
21, 10, 36, Private, America, Male, *, *, *, *, <=50K
33, 13, 70, *, United-States, *, White, *, *, *, >50K
33, 13, 70, *, United-States, *, White, *, *, *, >50K
33, 13, 70, *, United-States, *, White, *, *, *, <=50K
33, 13, 70, *, United-States, *, White, *, *, *, <=50K
33, 13, 70, *, United-States, *, White, *, *, *, <=50K
33, 13, 70, *, United-States, *, White, *, *, *, <=50K
33, 13, 70, *, United-States, *, White, *, *, *, <=50K
79, 12, 30, Self, America, *, White, *, *, *, <=50K
79, 12, 30, Self, America, *, White, *, *, *, >50K
79, 12, 30, Self, America, *, White, *, *, *, <=50K
79, 12, 30, Self, America, *, White, *, *, *, <=50K
79, 12, 30, Self, America, *, White, *, *, *, <=50K
79, 12, 30, Self, America, *, White, *, *, *, <=50K
79, 12, 30, Self, America, *, White, *, *, *, <=50K
29, 9, 40, Private, America, *, White, *, *, *, <=50K
29, 9, 40, Private, America, *, White, *, *, *, <=50K
29, 9, 40, Private, America, *, White, *, *, *, <=50K
29, 9, 40, Private, America, *, White, *, *, *, <=50K
29, 9, 40, Private, America, *, White, *, *, *, <=50K
29, 9, 40, Private, America, *, White, *, *, *, <=50K
29, 9, 40, Private, America, *, White, *, *, *, <=50K
18, 7, 23, Private, United-States, *, White, Never-married, Own-child, *, <=50K
18, 7, 23, Private, United-States, *, White, Never-married, Own-child, *, <=50K
18, 7, 23, Private, United-States, *, White, Never-married, Own-child, *, <=50K
18, 7, 23, Private, United-States, *, White, Never-married, Own-child, *, <=50K
18, 7, 23, Private, United-States, *, White, Never-married, Own-child, *, <=50K
18, 7, 23, Private, United-States, *, White, Never-married, Own-child, *, <=50K
18, 7, 23, Private, United-States, *, White, Never-married, Own-child, *, <=50K
21, 9, 35.5, Self, America, *, *, Never-married, *, *, <=50K
21, 9, 35.5, Self, America, *, *, Never-married, *, *, <=50K
21, 9, 35.5, Self, America, *, *, Never-married, *, *, <=50K
21, 9, 35.5, Self, America, *, *, Never-married, *, *, <=50K
21, 9, 35.5, Self, America, *, *, Never-married, *, *, <=50K
21, 9, 35.5, Self, America, *, *, Never-married, *, *, <=50K
21, 9, 35.5, Self, America, *, *, Never-married, *, *, <=50K
58.5, 11, 45, Self, *, *, White, *, *, services, <=50K
58.5, 11, 45, Self, *, *, White, *, *, services, <=50K
58.5, 11, 45, Self, *, *, White, *, *, services, <=50K
58.5, 11, 45, Self, *, *, White, *, *, services, <=50K
58.5, 11, 45, Self, *, *, White, *, *, services, <=50K
58.5, 11, 45, Self, *, *, White, *, *, services, >50K
58.5, 11, 45, Self, *, *, White, *, *, services, <=50K
37, 10, 40, *, America, Female, *, *, *, *, <=50K
37, 10, 40, *, America, Female, *, *, *, *, <=50K
37, 10, 40, *, America, Female, *, *, *, *, <=50K
37, 10, 40, *, America, Female, *, *, *, *, <=50K
37, 10, 40, *, America, Female, *, *, *, *, <=50K
37, 10, 40, *, America, Female, *, *, *, *, <=50K
37, 10, 40, *, America, Female, *, *, *, *, <=50K
35.5, 9, 40, *, United-States, *, *, *, *, *, <=50K
35.5, 9, 40, *, United-States, *, *, *, *, *, <=50K
35.5, 9, 40, *, United-States, *, *, *, *, *, >50K
35.5, 9, 40, *, United-States, *, *, *, *, *, <=50K
35.5, 9, 40, *, United-States, *, *, *, *, *, >50K
35.5, 9, 40, *, United-States, *, *, *, *, *, <=50K
35.5, 9, 40, *, United-States, *, *, *, *, *, <=50K
32.5, 7, 40, *, United-States, *, *, *, *, *, <=50K
32.5, 7, 40, *, United-States, *, *, *, *, *, <=50K
32.5, 7, 40, *, United-States, *, *, *, *, *, <=50K
32.5, 7, 40, *, United-States, *, *, *, *, *, <=50K
32.5, 7, 40, *, United-States, *, *, *, *, *, <=50K
32.5, 7, 40, *, United-States, *, *, *, *, *, <=50K
32.5, 7, 40, *, United-States, *, *, *, *, *, <=50K
35, 9, 40, *, United-States, Female, White, *, *, *, <=50K
35, 9, 40, *, United-States, Female, White, *, *, *, <=50K
35, 9, 40, *, United-States, Female, White, *, *, *, >50K
35, 9, 40, *, United-States, Female, White, *, *, *, <=50K
35, 9, 40, *, United-States, Female, White, *, *, *, <=50K
35, 9, 40, *, United-States, Female, White, *, *, *, <=50K
35, 9, 40, *, United-States, Female, White, *, *, *, <=50K
49, 11, 42.5, *, United-States, Male, *, Married-civ-spouse, Husband, *, >50K
49, 11, 42.5, *, United-States, Male, *, Married-civ-spouse, Husband, *, >50K
49, 11, 42.5, *, United-States, Male, *, Married-civ-spouse, Husband, *, <=50K
49, 11, 42.5, *, United-States, Male, *, Married-civ-spouse, Husband, *, >50K
49, 11, 42.5, *, United-States, Male, *, Married-civ-spouse, Husband, *, <=50K
49, 11, 42.5, *, United-States, Male, *, Married-civ-spouse, Husband, *, >50K
49, 11, 42.5, *, United-States, Male, *, Married-civ-spouse, Husband, *, <=50K
40.5, 9, 37.5, *, United-States, *, White, *, *, *, <=50K
40.5, 9, 37.5, *, United-States, *, White, *, *, *, <=50K
40.5, 9, 37.5, *, United-States, *, White, *, *, *, <=50K
40.5, 9, 37.5, *, United-States, *, White, *, *, *, <=50K
40.5, 9, 37.5, *, United-States, *, White, *, *, *, <=50K
40.5, 9, 37.5, *, United-States, *, White, *, *, *, <=50K
40.5, 9, 37.5, *, United-States, *, White, *, *, *, <=50K
46, 12.5, 40.5, *, United-States, *, *, *, *, *, <=50K
46, 12.5, 40.5, *, United-States, *, *, *, *, *, >50K
46, 12.5, 40.5, *, United-States, *, *, *, *, *, <=50K
46, 12.5, 40.5, *, United-States, *, *, *, *, *, <=50K
46, 12.5, 40.5, *, United-States, *, *, *, *, *, <=50K
46, 12.5, 40.5, *, United-States, *, *, *, *, *, <=50K
46, 12.5, 40.5, *, United-States, *, *, *, *, *, <=50K
27, 11.5, 38.5, Private, United-States, *, White, *, *, *, <=50K
27, 11.5, 38.5, Private, United-States, *, White, *, *, *, <=50K
27, 11.5, 38.5, Private, United-States, *, White, *, *, *, <=50K
27, 11.5, 38.5, Private, United-States, *, White, *, *, *, <=50K
27, 11.5, 38.5, Private, United-States, *, White, *, *, *, <=50K
27, 11.5, 38.5, Private, United-States, *, White, *, *, *, <=50K
27, 11.5, 38.5, Private, United-States, *, White, *, *, *, <=50K
38, 9, 34, Private, United-States, Female, *, *, *, *, <=50K
38, 9, 34, Private, United-States, Female, *, *, *, *, <=50K
38, 9, 34, Private, United-States, Female, *, *, *, *, <=50K
38, 9, 34, Private, United-States, Female, *, *, *, *, <=50K
38, 9, 34, Private, United-States, Female, *, *, *, *, <=50K
38, 9, 34, Private, United-States, Female, *, *, *, *, <=50K
38, 9, 34, Private, United-States, Female, *, *, *, *, <=50K
65, 8, 47.5, Self, United-States, *, *, *, *, *, <=50K
65, 8, 47.5, Self, United-States, *, *, *, *, *, <=50K
65, 8, 47.5, Self, United-States, *, *, *, *, *, <=50K
65, 8, 47.5, Self, United-States, *, *, *, *, *, <=50K
65, 8, 47.5, Self, United-States, *, *, *, *, *, <=50K
65, 8, 47.5, Self, United-States, *, *, *, *, *, <=50K
65, 8, 47.5, Self, United-States, *, *, *, *, *, >50K
47, 10, 39, *, America, *, White, *, *, *, <=50K
47, 10, 39, *, America, *, White, *, *, *, <=50K
47, 10, 39, *, America, *, White, *, *, *, <=50K
47, 10, 39, *, America, *, White, *, *, *, <=50K
47, 10, 39, *, America, *, White, *, *, *, <=50K
47, 10, 39, *, America, *, White, *, *, *, <=50K
47, 10, 39, *, America, *, White, *, *, *, <=50K
71, 13, 13.5, *, *, *, *, *, *, *, <=50K
71, 13, 13.5, *, *, *, *, *, *, *, >50K
71, 13, 13.5, *, *, *, *, *, *, *, <=50K
71, 13, 13.5, *, *, *, *, *, *, *, >50K
71, 13, 13.5, *, *, *, *, *, *, *, <=50K
71, 13, 13.5, *, *, *, *, *, *, *, <=50K
71, 13, 13.5, *, *, *, *, *, *, *, <=50K
34.5, 9.5, 42.5, Private, *, *, *, *, *, *, <=50K
34.5, 9.5, 42.5, Private, *, *, *, *, *, *, <=50K
34.5, 9.5, 42.5, Private, *, *, *, *, *, *, <=50K
34.5, 9.5, 42.5, Private, *, *, *, *, *, *, <=50K
34.5, 9.5, 42.5, Private, *, *, *, *, *, *, <=50K
34.5, 9.5, 42.5, Private, *, *, *, *, *, *, <=50K
34.5, 9.5, 42.5, Private, *, *, *, *, *, *, <=50K
22, 11, 16, *, *, *, White, Never-married, *, *, <=50K
22, 11, 16, *, *, *, White, Never-married, *, *, <=50K
22, 11, 16, *, *, *, White, Never-married, *, *, <=50K
22, 11, 16, *, *, *, White, Never-married, *, *, <=50K
22, 11, 16, *, *, *, White, Never-married, *, *, <=50K
22, 11, 16, *, *, *, White, Never-married, *, *, <=50K
22, 11, 16, *, *, *, White, Never-married, *, *, <=50K
40.5, 10, 44, Self, *, *, *, *, *, *, <=50K
40.5, 10, 44, Self, *, *, *, *, *, *, <=50K
40.5, 10, 44, Self, *, *, *, *, *, *, >50K
40.5, 10, 44, Self, *, *, *, *, *, *, >50K
40.5, 10, 44, Self, *, *, *, *, *, *, >50K
40.5, 10, 44, Self, *, *, *, *, *, *, <=50K
40.5, 10, 44, Self, *, *, *, *, *, *, <=50K
25, 5, 44, Private, America, *, White, *, *, *, <=50K
25, 5, 44, Private, America, *, White, *, *, *, <=50K
25, 5, 44, Private, America, *, White, *, *, *, <=50K
25, 5, 44, Private, America, *, White, *, *, *, <=50K
25, 5, 44, Private, America, *, White, *, *, *, <=50K
25, 5, 44, Private, America, *, White, *, *, *, <=50K
25, 5, 44, Private, America, *, White, *, *, *, <=50K
31, 14, 40, *, *, *, *, *, *, *, <=50K
31, 14, 40, *, *, *, *, *, *, *, >50K
31, 14, 40, *, *, *, *, *, *, *, <=50K
31, 14, 40, *, *, *, *, *, *, *, >50K
31, 14, 40, *, *, *, *, *, *, *, >50K
31, 14, 40, *, *, *, *, *, *, *, <=50K
31, 14, 40, *, *, *, *, *, *, *, <=50K
90, 12, 45, *, United-States, Male, *, *, *, *, <=50K
90, 12, 45, *, United-States, Male, *, *, *, *, <=50K
90, 12, 45, *, United-States, Male, *, *, *, *, <=50K
90, 12, 45, *, United-States, Male, *, *, *, *, >50K
90, 12, 45, *, United-States, Male, *, *, *, *, <=50K
90, 12, 45, *, United-States, Male, *, *, *, *, <=50K
90, 12, 45, *, United-States, Male, *, *, *, *, >50K
21.5, 10, 50, *, *, *, *, *, *, *, <=50K
21.5, 10, 50, *, *, *, *, *, *, *, >50K
21.5, 10, 50, *, *, *, *, *, *, *, <=50K
21.5, 10, 50, *, *, *, *, *, *, *, <=50K
21.5, 10, 50, *, *, *, *, *, *, *, <=50K
21.5, 10, 50, *, *, *, *, *, *, *, <=50K
21.5, 10, 50, *, *, *, *, *, *, *, <=50K
50, 14, 98, *, America, *, White, *, *, *, <=50K
50, 14, 98, *, America, *, White, *, *, *, <=50K
50, 14, 98, *, America, *, White, *, *, *, <=50K
50, 14, 98, *, America, *, White, *, *, *, >50K
50, 14, 98, *, America, *, White, *, *, *, >50K
50, 14, 98, *, America, *, White, *, *, *, <=50K
50, 14, 98, *, America, *, White, *, *, *, <=50K
43.5, 7, 24.5, Private, United-States, *, *, *, *, services, <=50K
43.5, 7, 24.5, Private, United-States, *, *, *, *, services, <=50K
43.5, 7, 24.5, Private, United-States, *, *, *, *, services, <=50K
`;

  private data:string = JSON.stringify({
    "grouptoken": "string",
    "usertoken": "string",
    "weights": {
      "bias": {
        "age": 0.37931034482758613,
        "education-num": 0.0689655172413793,
        "hours-per-week": 0.0689655172413793,
        "workclass": 0.0689655172413793,
        "native-country": 0.0689655172413793,
        "sex": 0.0689655172413793,
        "race": 0.0689655172413793,
        "relationship": 0.0689655172413793,
        "occupation": 0.0689655172413793,
        "marital-status": 0.0689655172413793
      },
      "iml": {
        "age": 0.13704865909390093,
        "education-num": 0.14385388791553647,
        "hours-per-week": 0.1279067106608888,
        "workclass": 0.11057201781371723,
        "native-country": 0.11958109916626228,
        "sex": 0.0958123676325629,
        "race": 0.12552706039834438,
        "relationship": 0.074162197318787,
        "occupation": 0.032768000000000005,
        "marital-status": 0.032768000000000005
      }
    },
    "csv": {
      "bias": this.csv_result,
      "iml": this.csv_result
    },
    "target": "income",
    // ===== OPTIONAL =====
    "user": {
      "token": "NjY6W29iamVjdCBPYmplY3RdOjE0OTU0NDI1NTI4MDk6dW5kZWZpbmVk",
      "education": {
        "id": 1,
        "description": "secondary modern school"
      },
      "age": 66,
      "username": "Anonym"
    },
    "survey": {
      "sid": 2,
      "target_column": "income",
    }
  });

  constructor(private http: Http) {
  }

  post2() {
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });
    let body = this.data;
    console.log('in post2');
    return this.http.post('http://berndmalle.com:5000/anonML', body, options).map((res: Response) => res.json());
  }

  private post() {
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8'
    });

    /*
        return this.http
          .post('http://berndmalle.com:5000/anonML', JSON.stringify(''), { headers: headers });

          */


    console.log(this.data);
    return this.http.post('http://berndmalle.com:5000/anonML', this.data, {
      headers: headers
    })
      .map(res => res.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
