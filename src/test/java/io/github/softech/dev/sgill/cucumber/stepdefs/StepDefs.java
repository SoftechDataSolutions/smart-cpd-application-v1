package io.github.softech.dev.sgill.cucumber.stepdefs;

import io.github.softech.dev.sgill.Smartcpdv1App;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = Smartcpdv1App.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
