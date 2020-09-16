package com.devsuperior.dspesquisa.services;

import java.time.Instant;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dspesquisa.dto.RecordDTO;
import com.devsuperior.dspesquisa.dto.RecordInsertDTO;
import com.devsuperior.dspesquisa.entities.Game;
import com.devsuperior.dspesquisa.entities.Record;
import com.devsuperior.dspesquisa.repositories.GameRepository;
import com.devsuperior.dspesquisa.repositories.RecordRepository;

@Service
public class RecordService {

	private RecordRepository recordRepository;
	private GameRepository gameRepository;
	
	public RecordService(RecordRepository recordRepository, GameRepository gameRepository) {
		this.recordRepository = recordRepository;
		this.gameRepository = gameRepository;
	}

	@Transactional
	public RecordDTO insert(RecordInsertDTO dto) {
		Record record = new Record();
		record.setName(dto.getName());
		record.setAge(dto.getAge());
		record.setMoment(Instant.now());
		
		Game game = gameRepository.getOne(dto.getGameId());
		record.setGame(game);
		
		record = recordRepository.save(record);
		return new RecordDTO(record);
	}

	
	
	
}
