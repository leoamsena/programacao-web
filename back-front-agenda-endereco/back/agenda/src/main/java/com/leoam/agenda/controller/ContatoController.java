package com.leoam.agenda.controller;

import com.leoam.agenda.model.Contato;
import com.leoam.agenda.service.ContatoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/contatos")
public class ContatoController {
    @Autowired
    ContatoService contatoService;
    
    @CrossOrigin
    @GetMapping("")
    public List<Contato> list() {
        return contatoService.listAllContatos();
    }
    
    @CrossOrigin
    @GetMapping("/byletter/{letra}")
    public List<Contato> listByLetter(@PathVariable String letra) {
    	letra = letra+"%";
        return contatoService.listAllContatosByLetter(letra);
    }
    
    @CrossOrigin
    @GetMapping("/search/{nome}")
    public List<Contato> listByNameLike(@PathVariable String nome) {
    	nome = "%"+nome+"%";
        return contatoService.listAllContatosByNameLike(nome);
    }
    
    
    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<Contato> get(@PathVariable Integer id) {
        try {
            Contato user = contatoService.getContato(id);
            return new ResponseEntity<Contato>(user, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Contato>(HttpStatus.NOT_FOUND);
        }
    }
    @CrossOrigin
    @PostMapping("/")
    public void add(@RequestBody Contato contato) {    
		contatoService.saveContato(contato);
    	
    	
    }
    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody Contato contato, @PathVariable Integer id) {
        try {
            Contato existContato = contatoService.getContato(id);
            contato.setId(id);            
            contatoService.saveContato(contato);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @CrossOrigin
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {

        contatoService.deleteContato(id);
    }
    
}