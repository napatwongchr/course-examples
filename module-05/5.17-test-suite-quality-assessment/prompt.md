# 5.17 เกณฑ์ประเมินคุณภาพ Test Suite ความน่าเชื่อถือของข้อสรุปจาก AI และการตัดสินใจระดับความเสี่ยง

## Quality assessment prompt

ช่วยประเมิน test suite นี้สำหรับโปรเจกต์ PLA โดยใช้ Test Quality Rubric

[วาง test code ที่ต้องการประเมิน]

ประเมินตาม 4 มิติ (คะแนน 1-5 แต่ละมิติ):

1. Test Coverage — ครอบคลุม code paths และ business logic ครบไหม
2. Edge Cases — ครอบคลุม boundary conditions และ error scenarios ไหม
3. Code Maintainability — อ่านง่าย ตั้งชื่อดี refactor ได้ไหม
4. Performance Impact — test รันเร็วพอสำหรับ CI/CD ไหม

ระบุ:

- คะแนนแต่ละมิติพร้อมเหตุผล
- คะแนนรวมและ overall assessment
- จุดที่ต้องปรับปรุงก่อน deploy
- Risk level: Low / Medium / High
