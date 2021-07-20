package pt.ua.tm.neji.sdk;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.JsonToken;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.apache.commons.io.FileUtils;

import pt.ua.tm.neji.core.module.Writer;
import pt.ua.tm.neji.core.parser.Parser;
import pt.ua.tm.neji.core.parser.ParserLanguage;
import pt.ua.tm.neji.core.parser.ParserLevel;
import pt.ua.tm.neji.core.pipeline.Pipeline;
import pt.ua.tm.neji.dictionary.Dictionary;
import pt.ua.tm.neji.dictionary.DictionaryHybrid;
import pt.ua.tm.neji.dictionary.VariantMatcherLoader;
import pt.ua.tm.neji.exception.NejiException;
import pt.ua.tm.neji.ml.MLHybrid;
import pt.ua.tm.neji.ml.MLModel;
import pt.ua.tm.neji.nlp.NLP;
import pt.ua.tm.neji.parser.GDepParser;
import pt.ua.tm.neji.pipeline.DefaultPipeline;
import pt.ua.tm.neji.reader.RawReader;
import pt.ua.tm.neji.sentencesplitter.LingpipeSentenceSplitter;
import pt.ua.tm.neji.usagi.UsagiSearchEngine;
import pt.ua.tm.neji.usagi.UsagiSearchEngine.ScoredConcept;
import pt.ua.tm.neji.usagi.indexBuilding.IndexBuildCoordinator;
import pt.ua.tm.neji.usagi.ui.Global;
import pt.ua.tm.neji.usagi.BerkeleyDbEngine;
import pt.ua.tm.neji.usagi.ImportDialog;
import pt.ua.tm.neji.writer.A1Writer;
import pt.ua.tm.neji.writer.JSONWriter;

public class MainSDK {
    
    //public static void main(String[] args) throws NejiException, IOException {

    private String documentFile, outputFile;

    public MainSDK(String folderCorpusIn, String folderCorpusOut) {
        this.documentFile = folderCorpusIn;
        this.outputFile = folderCorpusOut;
    }

    public void runSDK() throws NejiException, IOException {
        // Set files

        /* Usagi variables */
        Global.filename = "C:/Users/andre/Desktop/tese/ferramentas/usagi/FieldsToMap_processed.csv";
        Global.folder = "C:/Users/andre/Desktop/tese/ferramentas/neji/usagi";
        Global.usagiSearchEngine = new UsagiSearchEngine(Global.folder);
        Global.dbEngine = new BerkeleyDbEngine(Global.folder);

        System.out.println("Running main SDK...");
        String documentFile = "example/annotate/in/22528326.txt";
        //String outputFile = "example/annotate/out/22528326.a1";
        //String outputFile = "example/annotate/out/22528326test.json";
        String outputFile = "example/annotate/out/22528326.json";


        // Set resources
        String dictionary1File = "example/dictionaries/Body_Part_Organ_or_Organ_Component_T023_ANAT.tsv";
        String dictionary2File = "example/dictionaries/Disease_or_Syndrome_T047_DISO.tsv";
        String modelFile = "example/models/prge/prge.properties";
       
        NejiSDK(documentFile, outputFile, dictionary1File, dictionary2File, modelFile);
        List<String> nejiOut = parseJSONOutput(outputFile);
        //usagiIndex();
        //searchTerms(nejiOut);
    }

    public void NejiSDK(String documentFile, String outputFile, String dictionary1File, String dictionary2File, String modelFile) throws NejiException, IOException {

        // Create reader
        RawReader reader = new RawReader();
        
        // Create parser
        Parser parser = new GDepParser(ParserLanguage.ENGLISH, ParserLevel.CHUNKING, new LingpipeSentenceSplitter(), false).launch();
        
        // Create NLP        
        NLP nlp = new NLP(parser);
        
        // Create dictionary matchers
        List<String> dictionary1Lines = FileUtils.readLines(new File(dictionary1File));
        Dictionary dictionary1 = VariantMatcherLoader.loadDictionaryFromLines(dictionary1Lines);
        List<String> dictionary2Lines = FileUtils.readLines(new File(dictionary2File));
        Dictionary dictionary2 = VariantMatcherLoader.loadDictionaryFromLines(dictionary2Lines);
                
        DictionaryHybrid dictionaryMatcher1 = new DictionaryHybrid(dictionary1);
        DictionaryHybrid dictionaryMatcher2 = new DictionaryHybrid(dictionary2);
                
        // Create machine-learning model matcher
        MLModel model = new MLModel("prge", new File(modelFile));
        //model.initialize();                                                    // esta linha dá um stackoverflow error
        //MLHybrid mlModelMatcher = new MLHybrid(model.getCrf(), "prge");
        
        // Create Writer
        //Writer writer = new A1Writer();
        Writer writer = new JSONWriter();
        
        // Set document stream
        InputStream documentStream = new FileInputStream(documentFile);

        // Run pipeline to get annotations
        Pipeline pipeline = new DefaultPipeline()
                .add(reader)
                .add(nlp)
                .add(dictionaryMatcher1)
                .add(dictionaryMatcher2)
                //.add(mlModelMatcher)
                .add(writer);

        OutputStream outputStream = pipeline.run(documentStream).get(0);

        // Write annotations to output file
        FileUtils.writeStringToFile(new File(outputFile), outputStream.toString());
                
        // Close streams
        documentStream.close();
        outputStream.close();
        
        // Close parser
        parser.close();
        
    }

    public static List<String> parseJSONOutput(String outputFile) throws JsonParseException, IOException {

        List<String> nejiOut = new ArrayList<String>();
        final ObjectMapper objectMapper = new ObjectMapper();
        List<Annotation> annotationsList = objectMapper.readValue(new File(outputFile), new TypeReference<List<Annotation>>(){});

        annotationsList.forEach(x -> {
            //System.out.println(x.toString());
            List<Term> terms = x.getTerms();
            for(Term term : terms) {
                System.out.println(term.getText());
                nejiOut.add(term.getText());
            }
        });

        return nejiOut;

        /**** Usagi module ****/
        // O index já se encontra construído na pasta fornecida, noutra situação é preciso implementar a construção do index.
        /*Global.filename = "C:/Users/andre/Desktop/tese/ferramentas/usagi/FieldsToMap_processed.csv";
        Global.folder = "C:/Users/andre/Desktop/tese/ferramentas/neji/usagi";
        Global.usagiSearchEngine = new UsagiSearchEngine(Global.folder);
        Global.dbEngine = new BerkeleyDbEngine(Global.folder);*/
        
        
        
        /***** IMPORT CODES FROM A .CSV FILE *****/
        /*ImportDialog importDialog = new ImportDialog(Global.filename);
        importDialog.loadData(Global.filename);
        importDialog.importData();*/

        
    }

    public static void usagiIndex() {
        if (!Global.usagiSearchEngine.mainIndexExists()) {
            IndexBuildCoordinator buildIndex = new IndexBuildCoordinator();
            String vocabFolder = "C:\\Users\\andre\\Desktop\\tese\\ferramentas\\neji\\usagi\\vocabulary";
            String loincFolder = null;
		    buildIndex.buildIndexes(vocabFolder, loincFolder);
        }
        else {
			Global.usagiSearchEngine.openIndexForSearching(false);
			Global.dbEngine.openForReading();
		}
    }

    public static void searchTerms(List<String> nejiOut) {
        /***** SEARCH NEJI OUTPUT *****/
        List<List<ScoredConcept>> usagiOutput = new ArrayList<>();
        for (String term : nejiOut) {
            List<ScoredConcept> concepts = Global.usagiSearchEngine.search(term, true, null, null, null, null, true, true); 
            usagiOutput.add(concepts);
        }
    }
}
