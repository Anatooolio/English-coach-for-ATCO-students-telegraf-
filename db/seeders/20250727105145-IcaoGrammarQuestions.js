'use strict'

module.exports = {
	up: async queryInterface => {
		const now = new Date()
		await queryInterface.bulkInsert('IcaoGrammarQuestions', [
			{
				question:
					'What is the correct phrase to request a descent to 5,000 feet?',
				options: [
					'Request descend 5,000 feet',
					'Request descent to 5,000 feet',
					'Descend request 5,000 feet',
				],
				answerIndex: 1,
				explanation:
					'Правильная грамматическая форма — “Request descent to...”',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Which phrase is correct when confirming a heading?',
				options: [
					'Heading two five zero',
					'Heading 250 degrees',
					'Head to 250',
				],
				answerIndex: 0,
				explanation: 'Стандартизированная фраза — “Heading two five zero”',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Choose the correct sentence:',
				options: [
					'The aircrafts is ready for departure.',
					'The aircraft is ready for departure.',
					'The aircrafts are ready for departure.',
					'The aircraft are ready for departure.',
				],
				answerIndex: 1,
				explanation:
					'Слово "самолет" употребляется как в единственном, так и во множественном числе. В данном случае оно относится к одному воздушному судну.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which word correctly completes the sentence: "The pilot ___ the weather conditions before takeoff."?',
				options: ['check', 'checks', 'checking', 'checked'],
				answerIndex: 1,
				explanation:
					'Правильное время глагола - "checks", употребляемое в настоящем простом времени для второго лица единственного числа.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Identify the correct sentence:',
				options: [
					'The controller give the pilots clear instructions.',
					'The controller giving the pilots clear instructions.',
					'The controller gave the pilots clear instructions.',
					'The controller gives the pilots clear instructions.',
				],
				answerIndex: 2,
				explanation:
					'Использует прошедшее простое время для описания завершенного действия.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which word correctly completes the sentence: "The flight ___ delayed due to bad weather."?',
				options: ['is', 'are', 'was', 'were'],
				answerIndex: 2,
				explanation:
					'Относится к прошлому событию, из-за которого рейс был задержан.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Choose the correct sentence:',
				options: [
					'The passengers has boarded the plane.',
					'The passengers have boarded the plane.',
					'The passengers had boarded the plane.',
					'The passengers board the plane.',
				],
				answerIndex: 1,
				explanation:
					'Использует настоящее совершенное время для обозначения завершенного действия, относящегося к настоящему моменту.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which word correctly completes the sentence: "The captain ___ the crew before departure."?',
				options: ['brief', 'briefs', 'briefing', 'briefed'],
				answerIndex: 1,
				explanation:
					'Описывает привычное действие в настоящем простом времени.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Choose the correct sentence:',
				options: [
					'The runway lights is visible from the cockpit.',
					'The runway lights are visible from the cockpit.',
					'The runway lights was visible from the cockpit.',
					'The runway lights were visible from the cockpit.',
				],
				answerIndex: 1,
				explanation:
					'Существительное во множественном числе "lights" требует "are".',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which word correctly completes the sentence: "The air traffic controller ___ the pilot to change altitude."?',
				options: ['instruct', 'instructs', 'instructing', 'instructed'],
				answerIndex: 3,
				explanation: 'Относится к завершенному действию в прошлом.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Choose the correct sentence:',
				options: [
					'The weather conditions affects the flight schedule.',
					'The weather conditions affect the flight schedule.',
					'The weather conditions affected the flight schedule.',
					'The weather conditions affecting the flight schedule.',
				],
				answerIndex: 1,
				explanation:
					'Существительное во множественном числе требует глагол в настоящей простой форме.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which word correctly completes the sentence: "The aircraft ___ ready for takeoff."?',
				options: ['is', 'are', 'was', 'were'],
				answerIndex: 0,
				explanation:
					'Самолет здесь употребляется как существительное в единственном числе.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Choose the correct sentence:',
				options: [
					'The pilot have completed the pre-flight checklist.',
					'The pilot had completed the pre-flight checklist.',
					'The pilot completes the pre-flight checklist.',
					'The pilot has completed the pre-flight checklist.',
				],
				answerIndex: 3,
				explanation:
					'Настоящее совершенное время указывает на недавнее завершение.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which word correctly completes the sentence: "The passengers ___ waiting at the gate."?',
				options: ['is', 'are', 'was', 'were'],
				answerIndex: 1,
				explanation:
					'"Passengers" является множественным числом, поэтому мы используем "are".',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Choose the correct sentence:',
				options: [
					'The flight attendants is preparing for takeoff.',
					'The flight attendants are preparing for takeoff.',
					'The flight attendants was preparing for takeoff.',
					'The flight attendants were preparing for takeoff.',
				],
				answerIndex: 1,
				explanation:
					'Подлежащее во множественном числе "attendants" требует "are".',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which word correctly completes the sentence: "The controller ___ the pilot to descend."?',
				options: ['advise', 'advises', 'advising', 'advised'],
				answerIndex: 3,
				explanation:
					'Прошедшее простое время для обозначения завершенного действия.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which phrase is correct when requesting a change in altitude?',
				options: [
					'Request climb to flight level three zero zero',
					'Request climb to flight level three hundred',
					'Climb request flight level three zero zero',
				],
				answerIndex: 0,
				explanation:
					'Правильная фраза звучит так: “Request climb to flight level...”',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which word correctly completes the sentence: "The aircraft ___ cleared for departure."?',
				options: ['is', 'are', 'was', 'were'],
				answerIndex: 0,
				explanation:
					'Подлежащее “aircraft” принимает глагол “is” в настоящем простом.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Choose the correct sentence:',
				options: [
					'The aircraft will landing shortly.',
					'The aircraft will land shortly.',
					'The aircraft will lands shortly.',
					'The aircraft will landed shortly.',
				],
				answerIndex: 1,
				explanation: 'Правильная форма: “will land” (будущее простое время).',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Which phrase is correct for requesting a clearance?',
				options: [
					'Request clearance for take-off',
					'Request take-off clearance',
					'Clearance request for take-off',
				],
				answerIndex: 1,
				explanation: 'Стандартная фраза: “Request take-off clearance”.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which word correctly completes the sentence: "The pilot ___ the aircraft after the engine failure."?',
				options: ['land', 'lands', 'landed', 'landing'],
				answerIndex: 2,
				explanation:
					'Прошедшее время “landed” используется потому, что действие уже произошло.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Choose the correct sentence:',
				options: [
					'The weather conditions have improved since yesterday.',
					'The weather conditions has improved since yesterday.',
					'The weather condition have improved since yesterday.',
					'The weather condition has improved since yesterday.',
				],
				answerIndex: 0,
				explanation:
					'“Weather conditions” это множественное число, поэтому глагол должен быть “have”.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which phrase is correct when informing about aircraft separation?',
				options: [
					'The aircraft are separated by 5 miles.',
					'The aircraft is separated by 5 miles.',
					'The aircraft separation is 5 miles.',
				],
				answerIndex: 0,
				explanation:
					'“Aircraft” это множественное число, поэтому глагол должен быть “are separated”.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which word correctly completes the sentence: "The pilot ___ the aircraft according to the instructions."?',
				options: ['follow', 'follows', 'following', 'followed'],
				answerIndex: 3,
				explanation:
					'Прошедшее время “followed” используется потому, что действие было выполнено в прошлом.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Choose the correct sentence:',
				options: [
					'The air traffic control tower monitor the traffic.',
					'The air traffic control tower monitors the traffic.',
					'The air traffic control tower monitoring the traffic.',
					'The air traffic control tower monitored the traffic.',
				],
				answerIndex: 1,
				explanation:
					'Правильный глагол - это “monitors” для настоящего простого времени.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which word correctly completes the sentence: "The aircraft ___ on the runway for clearance."?',
				options: ['is', 'are', 'was', 'were'],
				answerIndex: 0,
				explanation:
					'Единственное число “aircraft” требует глагол “is” в настоящем времени.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Which phrase is correct when confirming an altitude?',
				options: [
					'Confirm altitude flight level three five zero',
					'Confirm flight level three five zero altitude',
					'Altitude confirm flight level three five zero',
				],
				answerIndex: 0,
				explanation:
					'Корректная фраза: “Confirm altitude flight level three five zero.”',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Choose the correct sentence:',
				options: [
					'The aircraft are ready for takeoff.',
					'The aircraft is ready for takeoff.',
					'The aircraft were ready for takeoff.',
					'The aircraft have ready for takeoff.',
				],
				answerIndex: 1,
				explanation:
					'“Aircraft” является единственным, поэтому используем “is”.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which word correctly completes the sentence: "The flight controller ___ the aircraft during the approach."?',
				options: ['guide', 'guides', 'guiding', 'guided'],
				answerIndex: 3,
				explanation:
					'Прошедшее время “guided” здесь правильно, потому что действие было завершено в прошлом.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which phrase is correct for instructing an aircraft to descend?',
				options: [
					'Descend to flight level one five zero',
					'Descend flight level one five zero',
					'Flight level one five zero descend',
				],
				answerIndex: 0,
				explanation: 'Корректная фраза: “Descend to flight level...”',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Choose the correct sentence:',
				options: [
					'The aircraft has been cleared for landing.',
					'The aircraft have been cleared for landing.',
					'The aircraft had been cleared for landing.',
					'The aircraft cleared for landing.',
				],
				answerIndex: 0,
				explanation:
					'Правильная форма - настоящее совершенное страдательное: “has been cleared.”',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which phrase is correct when requesting to hold at a specific location?',
				options: [
					'Request holding at waypoint Alpha',
					'Request hold at waypoint Alpha',
					'Hold request at waypoint Alpha',
				],
				answerIndex: 0,
				explanation: 'Корректная фраза: “Request holding at...”',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which word correctly completes the sentence: "The aircraft ___ preparing for approach."?',
				options: ['is', 'are', 'was', 'were'],
				answerIndex: 0,
				explanation:
					'Единственное число “aircraft” использует “is” в настоящем времени.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Choose the correct sentence:',
				options: [
					'The aircraft is climbing to flight level three two zero.',
					'The aircraft are climbing to flight level three two zero.',
					'The aircraft climb to flight level three two zero.',
					'The aircraft climbed to flight level three two zero.',
				],
				answerIndex: 0,
				explanation:
					'Единственное число “aircraft” использует “is” в настоящем длительном времени.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which word correctly completes the sentence: "The aircraft ___ received its clearance."?',
				options: ['have', 'has', 'had', 'having'],
				answerIndex: 1,
				explanation:
					'Единственное число “aircraft” использует “has” в настоящем совершенном времени.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Choose the correct sentence:',
				options: [
					'The flight controllers monitor the traffic at all times.',
					'The flight controllers monitors the traffic at all times.',
					'The flight controller monitors the traffic at all times.',
					'The flight controllers monitored the traffic at all times.',
				],
				answerIndex: 0,
				explanation:
					'Множественное число “controllers” используем глагол “monitor” (present simple).',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which word correctly completes the sentence: "The air traffic controller ___ the aircraft to change heading."?',
				options: ['advise', 'advises', 'advised', 'advising'],
				answerIndex: 2,
				explanation:
					'Прошедшее время “advised” правильно, потому что действие уже выполнено.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Which phrase is correct when reporting aircraft position?',
				options: [
					'Position report at waypoint Bravo',
					'Position report to waypoint Bravo',
					'At waypoint Bravo, position report',
				],
				answerIndex: 0,
				explanation: 'Корректная фраза: “Position report at...”',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Choose the correct sentence:',
				options: [
					'The aircraft will be landing soon.',
					'The aircraft will landing soon.',
					'The aircraft will landed soon.',
					'The aircraft land soon.',
				],
				answerIndex: 0,
				explanation:
					'Корректная форма глагола: “will be landing” (future continuous tense).',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which word correctly completes the sentence: "The aircraft ___ cleared for takeoff."?',
				options: ['is', 'are', 'was', 'were'],
				answerIndex: 0,
				explanation:
					'“Aircraft” в данном случае это единственное число, поэтому используем глагол “is”.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Which phrase is correct for confirming a change in speed?',
				options: [
					'Confirm speed one hundred knots',
					'Confirm one hundred knots speed',
					'Speed confirm one hundred knots',
				],
				answerIndex: 0,
				explanation: 'Корректная фраза: “Confirm speed...”',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Choose the correct sentence:',
				options: [
					'The aircraft has just completed the approach procedure.',
					'The aircraft had just completed the approach procedure.',
					'The aircraft have just completed the approach procedure.',
					'The aircraft completing the approach procedure.',
				],
				answerIndex: 0,
				explanation:
					'Настоящее совершенное время “has just completed” используется для обозначения недавнего завершения.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which word correctly completes the sentence: "The controller ___ the aircraft’s departure time."?',
				options: ['confirm', 'confirms', 'confirming', 'confirmed'],
				answerIndex: 3,
				explanation:
					'The past tense “confirmed” используется здесь потому, что действие уже произошло.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which phrase is correct when issuing a go-around instruction?',
				options: [
					'Go-around procedure initiated',
					'Initiating go-around procedure',
					'Go-around is initiated',
				],
				answerIndex: 0,
				explanation: 'Корректная фраза: “Go-around procedure initiated”.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which word correctly completes the sentence: "The pilot ___ instructed to turn left."?',
				options: ['is', 'was', 'are', 'were'],
				answerIndex: 1,
				explanation:
					'Прошедшее время “was” используется потому, что действие уже выполнено.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which phrase is correct when requesting to change to a new frequency?',
				options: [
					'Request change to frequency one two five decimal eight',
					'Request to change frequency one two five decimal eight',
					'Request one two five decimal eight change frequency',
				],
				answerIndex: 0,
				explanation: 'Корректная фраза: “Request change to frequency...”',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which word correctly completes the sentence: "The aircraft ___ the clearance to depart."?',
				options: ['received', 'receives', 'receiving', 'receive'],
				answerIndex: 0,
				explanation:
					'Прошедшее время “received” это правильно, потому что разрешение уже было получено.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Choose the correct sentence:',
				options: [
					'The aircraft was cleared to land, but the weather had worsened.',
					'The aircraft were cleared to land, but the weather had worsened.',
					'The aircraft were cleared to land, but the weather has worsened.',
					'The aircraft had cleared to land, but the weather had worsened.',
				],
				answerIndex: 0,
				explanation:
					'Корректная форма: “The aircraft was cleared...” (singular subject and past tense).',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which phrase is correct when informing an aircraft about restricted airspace?',
				options: [
					'Restricted airspace is active, do not enter.',
					'Do not enter restricted airspace, active.',
					'Airspace restricted, enter not allowed.',
				],
				answerIndex: 0,
				explanation:
					'Корректная фраза: “Restricted airspace is active, do not enter.” It’s clear and standard.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which word correctly completes the sentence: "The aircraft ___ unable to continue the approach due to weather conditions."?',
				options: ['is', 'are', 'was', 'were'],
				answerIndex: 2,
				explanation:
					'“Aircraft” здесь стоит в единственном числе и в прошедшем времени “was” используется для описания завершенного действия.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Choose the correct sentence:',
				options: [
					'The aircraft are requesting to change flight level.',
					'The aircraft requests to change flight level.',
					'The aircraft requested to change flight level.',
					'The aircraft requesting to change flight level.',
				],
				answerIndex: 2,
				explanation:
					'Правильное время - прошедшее простое: “requested to change flight level.”',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Which phrase is correct for issuing a descent instruction?',
				options: [
					'Descend to altitude four thousand feet.',
					'Descend altitude four thousand feet.',
					'To descend four thousand feet.',
				],
				answerIndex: 0,
				explanation: 'Корректная фраза: “Descend to altitude...”',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which word correctly completes the sentence: "The pilot ___ advised to divert due to bad weather."?',
				options: ['is', 'was', 'are', 'were'],
				answerIndex: 1,
				explanation:
					'Прошедшее время “was” используется потому, что действие уже произошло.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Choose the correct sentence:',
				options: [
					'The aircraft had been cleared for approach, but the visibility deteriorated.',
					'The aircraft was cleared for approach, but the visibility deteriorates.',
					'The aircraft were cleared for approach, but the visibility deteriorates.',
					'The aircraft cleared for approach, but the visibility deteriorating.',
				],
				answerIndex: 0,
				explanation:
					'Прошедшее совершенное время “had been cleared” здесь правильно показать последовательность событий.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which phrase is correct when confirming an aircraft’s altitude?',
				options: [
					'Confirm altitude at flight level two nine zero.',
					'Confirm at flight level two nine zero altitude.',
					'Altitude confirm at flight level two nine zero.',
				],
				answerIndex: 0,
				explanation: 'Корректная фраза: “Confirm altitude at flight level...”',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which word correctly completes the sentence: "The aircraft ___ hold at waypoint Delta."?',
				options: ['is', 'are', 'was', 'were'],
				answerIndex: 0,
				explanation:
					'Единственное сило “aircraft” использует “is” в настоящем времени.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which phrase is correct when instructing to expedite descent?',
				options: [
					'Expedite descent to flight level one two zero.',
					'Expedite to descent flight level one two zero.',
					'Descent expedite to flight level one two zero.',
				],
				answerIndex: 0,
				explanation: 'Корректная фраза: “Expedite descent to...”',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Choose the correct sentence:',
				options: [
					'The aircraft had been cleared for takeoff, but the runway was closed.',
					'The aircraft cleared for takeoff, but the runway closed.',
					'The aircraft has been cleared for takeoff, but the runway closed.',
					'The aircraft were cleared for takeoff, but the runway was closed.',
				],
				answerIndex: 0,
				explanation:
					'Прошедшее совершенное время “had been cleared” показывает, что разрешение было получено до того, как возникла проблема с взлетно-посадочной полосой.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which phrase is correct when instructing to maintain a heading?',
				options: [
					'Maintain heading two seven zero.',
					'Maintain two seven zero heading.',
					'Heading maintain two seven zero.',
				],
				answerIndex: 0,
				explanation: 'Корректная фраза: “Maintain heading...”',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which word correctly completes the sentence: "The pilot ___ informed about the weather conditions."?',
				options: ['is', 'was', 'are', 'were'],
				answerIndex: 1,
				explanation:
					'Прошедшее время “was” является правильным, потому что действие было завершено.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Choose the correct sentence:',
				options: [
					'The aircraft are requested to maintain altitude until further instructions.',
					'The aircraft requested to maintain altitude until further instructions.',
					'The aircraft requests to maintain altitude until further instructions.',
					'The aircraft maintains altitude until further instructions.',
				],
				answerIndex: 0,
				explanation:
					'Множественное число “aircraft” требует “are requested” (present passive).',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which phrase is correct when requesting to switch to another frequency?',
				options: [
					'Request frequency change to one two four decimal five.',
					'Request to change frequency to one two four decimal five.',
					'Request to switch frequency one two four decimal five.',
				],
				answerIndex: 1,
				explanation:
					'Корректная фраза: “Request to change frequency to...”. “To” is required before "change".',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which word correctly completes the sentence: "The aircraft ___ unable to maintain altitude."?',
				options: ['is', 'are', 'was', 'were'],
				answerIndex: 2,
				explanation:
					'“Aircraft” здесь это единственное число, поэтому, прошедшее время “was” правильное.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which phrase is correct when instructing an aircraft to hold at a specific point?',
				options: [
					'Hold at waypoint Bravo until further notice.',
					'Hold waypoint Bravo until further notice.',
					'Waypoint Bravo hold until further notice.',
				],
				answerIndex: 0,
				explanation:
					'Корректная фраза: “Hold at waypoint Bravo...”. Предлогом “at” требуется перед названием путевой точки.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question: 'Choose the correct sentence:',
				options: [
					'The aircraft had requested for a deviation due to weather.',
					'The aircraft had requested a deviation due to weather.',
					'The aircraft requested for a deviation due to weather.',
					'The aircraft requested a deviation due to weather.',
				],
				answerIndex: 1,
				explanation:
					'Фраза: “had requested” является правильным без необходимости в предлоге “for” после глагола “requested.”',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
			{
				question:
					'Which word correctly completes the sentence: "The aircraft ___ expected to arrive at the destination in 30 minutes."?',
				options: ['is', 'are', 'was', 'were'],
				answerIndex: 0,
				explanation:
					'“Aircraft” единственное число, поэтому мы используем “is” в настоящем времени.',
				type: 'singleSelect',
				createdAt: now,
				updatedAt: now,
			},
		])
	},

	down: async queryInterface => {
		await queryInterface.bulkDelete('IcaoGrammarQuestions', null, {})
	},
}
