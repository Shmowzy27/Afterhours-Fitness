import test from 'node:test';
import assert from 'node:assert/strict';
import * as C from '../dist/core.js';
test('cities map to date-aware local time zones',()=>{
 for(const city of C.cities)assert.doesNotThrow(()=>C.atTime('2026-09-21','20:00','19:00',city.zone));
 assert.equal(C.atTime('2026-01-10','20:00','19:00','Australia/Sydney'),'2026-01-10T09:00:00.000Z');
 assert.equal(C.atTime('2026-07-10','20:00','19:00','Australia/Sydney'),'2026-07-10T10:00:00.000Z');
 assert.equal(C.atTime('2026-01-10','20:00','19:00','Australia/Adelaide'),'2026-01-10T09:30:00.000Z');
 assert.equal(C.atTime('2026-01-10','20:00','19:00','Australia/Darwin'),'2026-01-10T10:30:00.000Z');
 assert.equal(C.atTime('2026-01-10','20:00','19:00','Australia/Perth'),'2026-01-10T12:00:00.000Z');
 assert.equal(C.atTime('2026-01-10','02:00','19:00','Asia/Singapore'),'2026-01-10T18:00:00.000Z');
});
test('DST gaps move forward and overlaps use first occurrence',()=>{
 assert.equal(C.zonedTime('2026-10-04','02:30','Australia/Sydney').toISOString(),'2026-10-03T16:30:00.000Z');
 assert.equal(C.zonedTime('2026-04-05','02:30','Australia/Sydney').toISOString(),'2026-04-04T15:30:00.000Z');
});
test('waking day follows city and overnight records remain intact',()=>{
 const p=structuredClone(C.defaults), now=new Date('2026-01-10T09:00Z');
 assert.equal(C.wakingDay({...p,city:'sydney'},now),'2026-01-10');
 assert.equal(C.wakingDay({...p,city:'davao'},now),'2026-01-09');
 const s=C.fresh();s.profile=p;s.plan=C.buildPlan(p,'2026-01-10');
 const before=JSON.stringify(s.plan);s.profile.city='sydney';
 assert.match(C.calendar(s),/Australia\/Sydney/);assert.equal(JSON.stringify(s.plan),before);
});
test('currency conversions and backward compatible backup validation',()=>{
 assert.match(C.formatMoney(1000,{currency:'USD',rate:.02}),/20\.00/);
 assert.match(C.formatMoney(1000,{currency:'SGD',rate:.025}),/25\.00/);
 assert.doesNotThrow(()=>C.validateBackup(C.fresh()));
 const s=C.fresh();s.region={city:'tampines',currency:'SGD',rate:.025};assert.doesNotThrow(()=>C.validateBackup(s));
 for(const rate of [0,-1,NaN,Infinity])assert.throws(()=>C.validateBackup({...s,region:{...s.region,rate}}));
 assert.throws(()=>C.validateBackup({...s,region:{...s.region,city:'unknown'}}));
});
