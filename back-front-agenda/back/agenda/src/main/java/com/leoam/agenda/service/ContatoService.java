package com.leoam.agenda.service;

import com.leoam.agenda.model.Contato;
import com.leoam.agenda.repository.ContatoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import javax.transaction.Transactional;
@Service
@Transactional
public class ContatoService {
	@Autowired
    private ContatoRepository contatoRepository;
    public List<Contato> listAllContatos() {
        return contatoRepository.findAll();
    }
    public List<Contato> listAllContatosByLetter(String letra) {
    	letra = letra+"%";
        return contatoRepository.findByNomeLike(letra);
    }
    public List<Contato> listAllContatosByNameLike(String nome) {
    	nome = "%"+nome+"%";
        return contatoRepository.findByNomeLike(nome);
    }


    public void saveContato(Contato contato) {
        contatoRepository.save(contato);
    }

    public Contato getContato(Integer id) {
        return contatoRepository.findById(id).get();
    }
    

    public void deleteContato(Integer id) {
        contatoRepository.deleteById(id);
    }

}
